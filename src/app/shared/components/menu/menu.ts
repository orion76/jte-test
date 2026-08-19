import { Component, input, model, OnInit, output } from '@angular/core';

import { MenuItem } from './menu-item/menu-item';
import { IMenuItemData } from './types';

@Component({
  selector: 'app-menu',
  imports: [MenuItem],
  templateUrl: './menu.html',
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
    return `menu--${this.direction()}`;
  }
}
