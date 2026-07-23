import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-panel',
  imports: [],
  templateUrl: './filter-panel.html',
})
export class FilterPanel implements OnInit{
  protected readonly historyItems = [
    'закрепить теги',
    'кнопка',
    'приложение',
    'форма',
    'текстовое поле',
    'выпадающий список',
  ];

  protected readonly filterGroups = [
    {
      label: 'Только',
      items: ['Теги', 'Просьбы', 'Контакты'],
    },
    {
      label: '',
      items: ['Я участник', 'Строгий поиск', 'В заголовках'],
    },
  ];

  ngOnInit(): void {
    console.log('[]filter panel','!!!!!!!!!!!!!!!!!!')
  }
}
