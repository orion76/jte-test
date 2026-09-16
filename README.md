# JteApp — тестовое задание (Frontend-разработчик Angular 2+)

Веб-приложение с адаптивным хедером: навигационное меню, панель пользователя и форма поиска с фильтрами. Ключевая функциональность — единая форма поиска, которая на десктопе открывается как overlay-панель, а на мобильных — как модальный экран, через собственную систему динамических оверлеев.

## Запуск

```bash
npm install
npm start        # ng serve, http://localhost:4200/
npm run build    # production-сборка в dist/
npm test         # unit-тесты (Vitest)
```

Требуется Node.js 20+, npm 11.

## 1. Структура проекта

Архитектура — послойная (feature-sliced style): слои изолированы директориями и path-алиасами `@app/*`, `@core/*`, `@features/*`, `@shared/*` (tsconfig.json).

```
src/
├── app/
│   ├── app.ts / app.html / app.config.ts / app.routes.ts   # корень приложения, провайдеры
│   ├── app-menu.config.ts          # конфигурация пунктов меню (InjectionToken PAGES_MENU)
│   ├── core/                       # каркас приложения
│   │   ├── components/
│   │   │   ├── header/             # шапка: логотип, меню, поиск, панель пользователя
│   │   │   ├── search-form/        # форма поиска + filter-panel (фильтры, история запросов)
│   │   │   └── user-panel/         # уведомления, профиль
│   │   └── services/
│   │       ├── viewport-observer/  # mobile/desktop как signal (обёртка над CDK BreakpointObserver)
│   │       └── theme-manager/      # theme-color / цвет status-bar для мобильных модалок
│   ├── shared/                     # переиспользуемые UI-примитивы
│   │   ├── components/
│   │   │   ├── button/             # конфигурируемая кнопка (атрибутный селектор [app-button])
│   │   │   ├── icon/               # рендер SVG/изображений + IconRegistry (кэш, ленивая загрузка)
│   │   │   ├── checkbox/           # двухсторонний binding через model(), стили default/round
│   │   │   ├── menu/               # горизонтальное/вертикальное меню из IMenuItemData[]
│   │   │   └── mobile-modal-layout/# оболочка мобильного модального экрана
│   │   └── services/
│   │       └── dom-parser.ts       # DOMParser как InjectionToken (тестируемость)
│   ├── features/
│   │   └── dynamic-overlay/        # динамические оверлеи (см. «Детали реализации»)
│   │       ├── overlay-manager.ts  # реестр outlet-ов, open/close по id
│   │       ├── overlay-outlet/     # точка рендера: NgComponentOutlet + мобильная/десктопная обёртка
│   │       ├── tokens.ts           # OVERLAY_OUTLET_CLOSE_EVENT_TOKEN
│   │       └── types.ts            # IOverlayOpenOptions, IOverlayManager
│   ├── layouts/main/               # MainLayout (header + RouterOutlet) — задел под роутинг
│   └── pages/home/                 # страница Home — задел под роутинг
├── styles/                         # SCSS-архитектура дизайн-токенов
│   ├── _variables.scss             # Global-слой: палитра, шкалы spacing/radius/size
│   ├── _theme.scss                 # Theme-слой: семантические переменные --theme--*
│   ├── _properties.scss            # Override-слой: регистрация @property (inherits: false)
│   ├── _breakpoints.scss           # единственная точка определения брейкпоинтов
│   ├── mixins/                     # button, form, flex/structured — параметризуемые миксины
│   └── elements/                   # глобальные стили элементов (form, badge)
└── assets/                         # SVG-иконки, аватары, логотип
```

Связи между слоями односторонние: `pages/layouts → core → features → shared`. `shared` не знает о `core` и выше.

## 2. Применённые технологии и детали реализации

### Angular 21, standalone-компоненты, signals

- **Почему:** актуальная LTS-ветка с современными API; NgModule не используются — все компоненты standalone, DI через `inject()` вместо конструкторов.
- **Reactivity на signals:** состояние компонентов построено на `signal`, `computed`, `linkedSignal`, `model` (двусторонний биндинг без `ngModel`/EventEmitter), `effect`. Например, `ViewportObserver` хранит текущий вьюпорт как `signal<'mobile' | 'desktop'>`, а компоненты читают его через `computed` — смена вьюпорта автоматически перестраивает UI.
- **ChangeDetectionStrategy.OnPush** во всех компонентах: в связке с signals это даёт предсказуемый и дешёвый change detection.
- **Новый control flow и `@let`** в шаблонах (`@if`, `@switch`, `@let opts = openSignal()` в overlay-outlet) — вместо структурных директив `*ngIf/*ngSwitch`.
- **TypeScript strict** + `strictTemplates`, `strictInjectionParameters` — максимум проверок компилятора.

### Dynamic Overlay (features/dynamic-overlay) — ключевое решение

Собственная альтернатива ` MatDialog/Overlay` из CDK, написанная на signals:

- `OverlayManager` — корневой сервис-реестр: outlet-ы регистрируются по строковому id (`mobile`, `search-form-desktop`), открытие — запись `IOverlayOpenOptions` (компонент + inputs + title) в signal outlet-а.
- `OverlayOutlet` — declarative-точка рендера: сам решает, во что обернуть контент в зависимости от `viewport` (мобильная модалка `MobileModalLayout` или десктопный backdrop), рендерит произвольный компонент через `NgComponentOutlet` с передачей inputs.
- **DI-изоляция:** outlet создаёт дочерний `Injector` с токеном `OVERLAY_OUTLET_CLOSE_EVENT_TOKEN`. Контент оверлея (SearchForm) инжектирует токен и закрывает оверлей изнутри, **не зная ничего о самом оверлее** — слабая связность вместо прямых ссылок на родителя.
- **Почему своё, а не CDK Overlay:** демонстрация работы с низкоуровневыми API (`NgComponentOutlet`, `Injector.create`, `WritableSignal` в DI-токенах) и полный контроль над адаптивным поведением без лишнего веса библиотеки.

### IconRegistry + кастомные иконки (shared/components/icon)

- **Почему не Angular Material:** в задании кастомный набор SVG из макета; собственный реестр легче и нагляднее.
- Реализация: `HttpClient` загружает SVG как текст по имени → `DOMParser` (инжектируется через token — легко подменить в тестах) извлекает `viewBox` и содержимое → `DomSanitizer.bypassSecurityTrustHtml` для безопасной вставки → кэш на `shareReplay({ bufferSize: 1, refCount: true })`, чтобы одна иконка загружалась ровно один раз на приложение. `timeout` + `catchError` — устойчивость к сетевым сбоям.
- Компонент `Button` различает типы источника иконки (имя SVG vs путь к файлу — regex-валидация) и сам выбирает режим рендера; aria-label формируется из конфига с фолбэками.

### Адаптивность: CDK BreakpointObserver → signal

- **Почему CDK:** `BreakpointObserver` — готовое, оттестированное решение для media queries; писать свой `matchMedia`-сервис не нужно.
- RxJS-поток конвертируется в signal один раз в `ViewportObserver` (`takeUntilDestroyed` — корректная отписка), дальше всё приложение работает с синхронным сигнальным API без подписок в компонентах. Это пример аккуратного RxJS ↔ Signals interop.
- Один и тот же `SearchForm` используется в двух контекстах: десктопный overlay и мобильная модалка — различия только в computed-флагах (`isMobile`, стили чекбоксов, анимации).

### SCSS: трёхслойная система дизайн-токенов

Осознанная архитектурная стратегия (описана в `.project/instructions/style-strategy.md`):

1. **Global** (`_variables.scss`) — сырая палитра и шкалы (`--color-primary`, `--spacing-md`, `--size-button-medium`);
2. **Theme** (`_theme.scss`) — семантические переменные `--theme--*`, ссылаются только на Global; переключение темы — правка одного файла;
3. **Override** (`@property` с `inherits: false` в `_properties.scss`) — «ручки» кастомизации конкретного экземпляра компонента: миксины читают `var(--button-radius, var(--theme--button-radius))`, а потребитель может переопределить значение по месту, и оно гарантированно **не протечёт** на вложенные элементы.

Дополнительно:

- параметризуемые SCSS-миксины (button/form/flex) — единый источник стилей контролов с локальными переменными `--local--*`;
- брейкпоинт определён в одном месте (`_breakpoints.scss`), `includePaths` в angular.json убирает относительные пути в `@use`;
- бюджеты стилей в production-сборке (`anyComponentStyle: 4kB warning`) дисциплинируют размер CSS компонентов;
- плоские имена классов без БЭМ-`__`/`--` (миграция выполнена в commit 8d743e4): состояния выражаются классами-модификаторами (`:host(.round)`, `.panel.left`).

### ThemeManager (core/services/theme-manager)

Управляет `meta[name=theme-color]` и цветом фона body при открытии/закрытии мобильных модалок — нативный для мобильных браузеров способ покрасить status bar. Хуки вызываются из lifecycle `MobileModalLayout` (`ngOnInit`/`ngOnDestroy`), поэтому логика темы живёт рядом с причиной её изменения.

### Прочее

- **RxJS ~7.8** — только там, где он уместен: HTTP, CDK BreakpointObserver; внутри приложения состояние — signals.
- **Vitest** — unit-тесты (`ng test`); **Playwright** подключён как dev-зависимость для браузерной проверки вёрстки.
- **Prettier** — конфиг в package.json (printWidth 100, singleQuote, angular-парсер для HTML).
- **Конфигурация через DI:** пункты меню — `InjectionToken PAGES_MENU` (`provideMenus()`), а не хардкод в компоненте — меню подменяемо для тестов и альтернативных сборок.
- Заделы под развитие: `MainLayout` + `RouterOutlet`, страница `Home`, пустой `app.routes.ts` — структура готова к подключению роутинга без рефакторинга.
