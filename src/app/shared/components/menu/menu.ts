import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';

import { Button } from '../button/button';
import { IMenuItemData, TMenuItemData } from './types';

@Component({
  selector: 'app-menu',
  imports: [ Button],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Menu {
  readonly items = input<IMenuItemData[]>([]);
  readonly itemsWithClass: Signal<TMenuItemData[]> = computed(() => {
    return this.items().map(this.addItemClasses);
  });
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  protected readonly menuItemClass = 'menu-item';

  protected onClick(item: IMenuItemData): void {
    console.log('[Menu]- click', item.id);
  }
  hostClasses() {
    return `menu menu--${this.direction()}`;
  }
  private addItemClasses = (item: IMenuItemData): TMenuItemData => {
    const classes = [this.menuItemClass, `${this.menuItemClass}--${item.id}`];
    return { ...item, class: classes.join(' ') };
  };
}
