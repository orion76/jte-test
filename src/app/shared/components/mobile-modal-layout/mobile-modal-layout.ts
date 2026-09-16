import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { THEME_MANAGER } from '@core/services/theme-manager/injection-token';
import { IThemeManager } from '@core/services/theme-manager/types';
import { Button } from '../button/button';
import { IButton } from '../button/types';

@Component({
  selector: 'app-mobile-modal-layout',
  imports: [Button],
  templateUrl: './mobile-modal-layout.html',
  styleUrl: './mobile-modal-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'modal',
    'animate.enter': 'fade-in',
    'animate.leave': 'fade-out',
  },
})
export class MobileModalLayout implements OnInit, OnDestroy {
  readonly title = input<string>();
  readonly closed = output<boolean>();
  private themeManager: IThemeManager = inject(THEME_MANAGER);

  protected readonly buttonBack: IButton = { id: 'back', icon: 'arrow-back', ariaLabel: 'Назад' };
  ngOnInit(): void {
    this.themeManager.onOpenMobileModalLayout();
  }
  ngOnDestroy(): void {
    this.themeManager.onCloseMobileModalLayout();
  }
  animateEnter() {
    return 'fade-in';
  }

  animateLeave() {
    return 'fade-out';
  }
}
