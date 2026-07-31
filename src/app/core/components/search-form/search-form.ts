import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FilterPanel } from '../filter-panel/filter-panel';
import { Icon } from '../../../shared/components/icon/icon';

@Component({
  selector: 'app-search-form',
  imports: [FilterPanel, Icon],
  templateUrl: './search-form.html',
  host: {
    class:'search-form',
    'animate.enter': 'slide-in',
    'animate.leave': 'slide-out',
  },
})
export class SearchForm {
  readonly query = model('');
  readonly submit = output<void>();
  readonly close = output<void>();

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly isShowForm = signal<boolean>(false);
  constructor() {
    effect(() => {
      console.log('[search form] isShowForm:', this.isShowForm());
    });
  }

  protected onSubmit(): void {
    this.submit.emit();
  }

  protected onBack(): void {
    this.submit.emit();
  }

  onSearchFieldFocus() {
    console.log('[SEARCH FORM] - on focus');
    this.isShowForm.set(true);
  }

  onSearchFieldBlur() {
    console.log('[SEARCH FORM] - on blur');
    this.isShowForm.set(false);
  }
  log(...args: any[]) {
    console.log('[search form]', ...args);
  }
}
