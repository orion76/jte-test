import { Component, inject } from '@angular/core';
import { Icon } from '@shared/components';
import { ViewportObserver } from '../../services/viewport-observer/viewport-observer';

@Component({
  selector: 'app-user-panel',
  imports: [Icon],
  templateUrl: './user-panel.html',
  styleUrl: './user-panel.scss',
})
export class UserPanel {
  public readonly layout = inject(ViewportObserver);
}
