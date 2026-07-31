# Test Stand — инструкция для разработки

## Запуск

```bash
cd test-stand
npm run dev        # Vite dev-сервер с HMR на localhost:5173
npm run build      # сборка статики в test-stand/dist/
npm run preview    # предпросмотр собранного
```

## Структура

```
test-stand/
├── index.html              # Меню-индекс всех компонентов
├── styles/
│   └── variables.scss      # CSS-переменные (копия из Angular)
├── vite.config.ts          # MPA-конфиг: каждая подпапка = страница
├── Guide.md                # ← этот файл
└── components/
    └── <component-name>/
        ├── index.html      # Страница компонента
        ├── style.scss      # Стили (копия/адаптация из Angular)
        └── script.ts       # Логика (интерактивность на чистом TS)
```

## Как добавить новый компонент

1. Создать папку `test-stand/components/<component-name>/`
2. Создать `index.html` — страницу с версткой
3. Создать `style.scss` — скопировать из Angular SCSS, убрать `@use`/зависимости
4. Создать `script.ts` — логику на чистом TS (без Angular)
5. Добавить вход в `vite.config.ts` → `build.rollupOptions.input` (путь: `resolve(root, 'components', '<component-name>', 'index.html')`)
6. Добавить ссылку в `index.html` (меню): `href="/components/<component-name>/"`

## Стилизация

- SCSS-переменные и миксины из Angular НЕ использовать — только CSS-переменные (`var(--color-*)`)
- `styles/variables.scss` содержит все CSS-переменные из Angular
- Стили скопировать из Angular-файлов и адаптировать: убрать `::ng-deep`, `@use`, ViewEncapsulation
- Если в компоненте используется Angular-директива (например, `app-icon`), заменить на `<span data-icon="name">` + `renderIcons()` в script.ts
- Если используется Angular-пайп/контрол-флоу (`@if`, `@for`), заменить на vanilla JS

## Иконки

Список доступных иконок живёт в `/assets/icons/`. Скрипт подгружает их через `fetch`.
Для вставки иконки в HTML: `<span data-icon="search"></span>`
Вызов `renderIcons()` в `DOMContentLoaded` заполнит их SVG.

## Locators

Файл `locators.yml` — иерархический реестр элементов страницы.

**Структура:**
```yaml
header:                          # регион / блок
  _class: header                 # CSS-класс элемента (без точки)
  _desc: Верхняя панель          # описание

  appMenu:                       # дочерний элемент
    _class: app-menu
    _desc: Меню навигации

    links:                       # вложенный элемент (3-й уровень)
      _class: menu-item__button--links
      _desc: Пункт «Ссылки»
```

**Правила:**
- У каждого узла ДВА служебных поля: `_class` (CSS-класс элемента) и `_desc` (описание)
- Остальные поля — имена дочерних узлов (регионы/блоки/элементы)
- Полный селектор собирается конкатенацией `_class` всех родителей через пробел с префиксом `.` у каждого: `.header .app-menu .menu-item__button--links`
- Классы указываются без точки
- Если у элемента нет класса — **добавить его** в HTML/шаблоне
- Для списков/меню каждому пункту дать уникальный класс в шаблоне

**Namespace при описании задач:**
Namespace задаётся в квадратных скобках в начале блока инструкций и действует на все последующие строки до следующего namespace.

Формат:
- `[регион]` — элементы указываются через точку: `блок.элемент`
- `[регион.блок]` — элементы указываются напрямую: `элемент`

```
[header]
buttonSearch — скрыть кнопку поиска
appMenu — спрятать меню
appSearchForm.searchInput — установить фокус в поле поиска

[header.appMenu]
links — подсветить пункт «Ссылки»
contacts — скрыть пункт «Контакты»

[header.appSearchForm]
searchInput — установить фокус
searchClearBtn — показать кнопку очистки
```

**При добавлении нового компонента:**
1. Определить регионы на странице
2. Для каждого региона описать блоки и элементы в иерархии
3. Если у элемента нет класса — добавить
4. Селектор собирается автоматически из цепочки `_class`

## Тестирование через MCP Playwright

Кнопка поиска находится под `.search-form-container` (position: absolute; z-index: 10).
Playwright считает её перекрытой, хотя для пользователя она кликабельна.
Используй `page.evaluate` для клика:

```js
const sel = '.header .header__center .button-search';
await page.evaluate((s) => document.querySelector(s).click(), sel);
```

При работе с locators читай `locators.yml`, доставай селектор и используй его.

## Перенос в Angular

После отладки в test-stand:
1. Скопировать `style.scss` → в Angular SCSS-файл
2. Скопировать разметку из `index.html` → в Angular template (заменить data-icon на app-icon, добавить Angular-бinding'и)
3. Скопировать логику из `script.ts` → в Angular component class
