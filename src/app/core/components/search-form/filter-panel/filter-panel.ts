import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { IViewportObserver } from '@core/services/viewport-observer/types';
import { ViewportObserver } from '@core/services/viewport-observer/viewport-observer';
import { Checkbox } from '@shared/components';
import { UCheckboxStyle } from '@shared/components/checkbox/types';

@Component({
  selector: 'app-filter-panel',
  imports: [Checkbox],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanel {
  protected viewportObserver: IViewportObserver = inject(ViewportObserver);
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
