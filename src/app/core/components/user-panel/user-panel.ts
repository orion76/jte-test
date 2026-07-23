import { Component, inject } from '@angular/core';
import { ViewportObserver } from '../../services/viewport-observer';
import { Icon } from '../../../shared/components';
import { CurrentUser } from '../../services/current-user/current-user';

@Component({
  selector: 'app-user-panel',
  imports: [Icon],
  templateUrl: './user-panel.html',
})
export class UserPanel {
  public readonly layout = inject(ViewportObserver);
  public readonly user = inject(CurrentUser);
}
