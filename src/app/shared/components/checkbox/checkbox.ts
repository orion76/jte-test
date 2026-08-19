import { Component, computed, input, model, ViewEncapsulation } from '@angular/core';
import { UCheckboxStyle } from './types';

@Component({
  selector: 'app-checkbox',
  templateUrl: 'checkbox.html',
  styleUrl: './checkbox.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'styleClass()',
  },
})
export class Checkbox {
  readonly checked = model(false);
  readonly label = input('');
  readonly inputStyle = input<UCheckboxStyle>('default');

  readonly styleClass = computed(() => `checkbox checkbox--${this.inputStyle()}`);

  protected onChange(value: boolean): void {
    this.checked.set(value);
  }
}
