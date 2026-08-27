import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { UCheckboxStyle } from './types';

@Component({
  selector: 'app-checkbox',
  templateUrl: 'checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'checkbox',
    '[class]': 'hostClasses()',
  },
})
export class Checkbox {
  readonly checked = model(false);
  readonly label = input('');
  readonly inputStyle = input<UCheckboxStyle>('default');

  readonly hostClasses = computed(() => `checkbox--${this.inputStyle()}`);

  protected onChange(value: boolean): void {
    this.checked.set(value);
  }
}
