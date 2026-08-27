import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { Checkbox } from '@shared/components';
import { UCheckboxStyle } from '@shared/components/checkbox/types';
import { ViewportObserver } from '../../../services/viewport-observer/viewport-observer';

@Component({
  selector: 'app-filter-panel',
  imports: [Checkbox],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'filter-panel',
  },
  // encapsulation: ViewEncapsulation.None,
})
export class FilterPanel {
  protected viewportObserver = inject(ViewportObserver);
  readonly checkboxStyle = input<UCheckboxStyle>('default');

  history = model<string>('');

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
}
