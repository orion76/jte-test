import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { OVERLAY_OUTLET_CLOSE_EVENT_TOKEN } from '@features/dynamic-overlay/tokens';
import { Icon } from '@shared/components/icon/icon';
import { ViewportObserver } from '../../services/viewport-observer/viewport-observer';
import { FilterPanel } from './filter-panel/filter-panel';

@Component({
  selector: 'app-search-form',
  imports: [FilterPanel, Icon],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'search-form',
    '[animate.enter]': 'enterAnimation()',
    '[animate.leave]': 'leaveAnimation()',
  },
})
export class SearchForm {
  protected viewportObserver = inject(ViewportObserver);

  readonly query = model<string>('');
  history = signal<string>('');

  readonly close = inject(OVERLAY_OUTLET_CLOSE_EVENT_TOKEN);

  readonly isMobile = computed(() => this.viewportObserver.viewport() === 'mobile');
  readonly isDesktop = computed(() => this.viewportObserver.viewport() === 'desktop');
  readonly checkboxStyle = computed(() => (this.isMobile() ? 'round' : 'default'));
  protected readonly enterAnimation = computed(() => (this.isDesktop() ? 'slide-in' : ''));
  protected readonly leaveAnimation = computed(() => (this.isDesktop() ? 'slide-out' : ''));
  readonly isShowForm = linkedSignal(() => {
    const isOpen = !this.close();
    const isMobile = !this.isDesktop();
    return isMobile && isOpen;
  });

  constructor() {
    effect(() => this.query.set(this.history()));
  }

  onSearchFieldFocus() {
    if (this.isDesktop()) {
      this.isShowForm.set(true);
    }
  }
}
