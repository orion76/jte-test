import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { Icon } from '../icon/icon';
import { ThemeManager } from '../../../core/services/theme-manager/theme-manager';

@Component({
  selector: 'app-mobile-modal-layout',
  imports: [Icon],
  templateUrl: './mobile-modal-layout.html',
  styleUrl: './mobile-modal-layout.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mobile-modal-layout',
    'animate.enter': 'fade-in',
    'animate.leave': 'fade-out',
  },
})
export class MobileModalLayout implements OnInit, OnDestroy {
  readonly title = input<string>();
  readonly close = output<boolean>();
  private themeManager = inject(ThemeManager);

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
