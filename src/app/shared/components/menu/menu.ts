import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Button } from '../button/button';
import { IMenuItemData } from './types';

@Component({
  selector: 'app-menu',
  imports: [Button],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Menu {
  readonly items = input<IMenuItemData[]>([]);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');

  protected onClick(item: IMenuItemData): void {
    console.log('[Menu]- click', item.id);
  }

  hostClasses() {
    return this.direction();
  }
}
