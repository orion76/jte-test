import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';
import { VIEWPORT_OBSERVER } from '@core/services/viewport-observer/injection-token';
import { IViewportObserver } from '@core/services/viewport-observer/types';
import { OVERLAY_OUTLET_CLOSE_EVENT_TOKEN } from '@features/dynamic-overlay/tokens';
import { Button } from '@shared/components/button/button';
import { IButton } from '@shared/components/button/types';
import { FilterPanel } from './filter-panel/filter-panel';

@Component({
  selector: 'app-search-form',
  imports: [FilterPanel, Button],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[animate.enter]': 'enterAnimation()',
    '[animate.leave]': 'leaveAnimation()',
  },
})
export class SearchForm {
  protected viewportObserver: IViewportObserver = inject(VIEWPORT_OBSERVER);

  readonly query = model<string>('');
  history = signal<string>('');

  readonly close = inject(OVERLAY_OUTLET_CLOSE_EVENT_TOKEN);

  readonly isMobile = computed(() => this.viewportObserver.viewport() === 'mobile');
  readonly isDesktop = computed(() => this.viewportObserver.viewport() === 'desktop');
  readonly checkboxStyle = computed(() => (this.isMobile() ? 'round' : 'default'));
  protected readonly enterAnimation = computed(() => (this.isDesktop() ? 'slide-in' : ''));
  protected readonly leaveAnimation = computed(() => (this.isDesktop() ? 'slide-out' : ''));
  // Mobile: открыта вместе с модалкой (уничтожается при закрытии).
  // Desktop: показывается по фокусу поля и остаётся видимой во время slide-out.
  readonly isShowForm = signal(this.isMobile());

  protected readonly buttonClear: IButton = {
    id: 'clear',
    icon: 'cancel',
    iconPlace: 'end',
    ariaLabel: 'Очистить',
  };

  constructor() {
    effect(() => this.query.set(this.history()));
  }

  onSearchFieldFocus() {
    if (this.isDesktop()) {
      this.isShowForm.set(true);
    }
  }
}
