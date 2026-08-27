import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '@shared/components/button/button';
import { IButton } from '@shared/components/button/types';
import { ViewportObserver } from '../../services/viewport-observer/viewport-observer';

@Component({
  selector: 'app-user-panel',
  imports: [Button],
  templateUrl: './user-panel.html',
  styleUrl: './user-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPanel {
  public readonly layout = inject(ViewportObserver);
  protected readonly buttons: Record<string, IButton> = {
    notifications: {
      id: 'notifications',
      icon: 'notifications',
      ariaLabel: 'Уведомления',
      buttonType: 'icon-only',
    },
    profile: {
      id: 'profile',
      ariaLabel: 'Профиль',
      icon: 'assets/avatars/user.png',
      buttonType: 'icon-only',
    },
  };
}
