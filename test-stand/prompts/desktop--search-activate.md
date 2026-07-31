# desktop--search-activate — анимация выезда формы поиска

## Страница

`/components/desktop--search-activate/` — статический HTML/TS стенд для отладки.

## Схема

@jte-app/test-stand/locators.yml

## Поведение

- По клику на `buttonSearch`:
  1. Кнопка `buttonSearch` скрывается (display: none)
  2. Ширина контейнера `.search-form-container` устанавливается равной ширине `.app-menu`
  3. Контейнер позиционируется прижатым к левому краю (left: 0)
  4. Форма внутри контейнера анимируется: `translateX(0)` — плавно выезжает слева
  5. Форма перекрывает только `appMenu`, не затрагивая `buttonAdd` и остальную часть хедера

- По повторному клику на `buttonSearch`:
  1. Форма анимируется: `translateX(ширина_родителя)` — уезжает за правый край `.header__center`
  2. Кнопка `buttonSearch` снова показывается

- Ввод текста в `searchInput`:
  1. Появляется кнопка `searchClearBtn`

## Locators

Для обращений к элементам в задачах используется namespace:

```
[header]
buttonSearch — скрыть
buttonAdd — показать
appSearchForm.searchInput — установить фокус

[header.appSearchForm]
searchInput — очистить
searchClearBtn — показать

[header.appMenu]
links — подсветить
contacts — скрыть
```

## CSS-анимация

Форма анимируется через JS `transition: transform 0.3s ease-in-out`.
Открытие: `translateX(0)` — форма стоит на месте, перекрывая appMenu.
Закрытие: `translateX(ширина .header__center)` — форма уезжает за правый край родителя.
Ширина формы равна ширине `appMenu`, позиционируется прижатой к левому краю (`left: 0`).
