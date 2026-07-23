import { Component, input, model, OnInit, output } from '@angular/core';

import { MenuItem } from './menu-item/menu-item';
import { IMenuItemData } from './types';

@Component({
  selector: 'app-menu',
  imports: [MenuItem],
  templateUrl: './menu.html',
})
export class Menu implements OnInit {
  readonly items = input<IMenuItemData[]>([]);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly activeItem = model<string | null>(null);
  readonly itemClick = output<IMenuItemData>();

  protected onClick(item: IMenuItemData): void {
    if (item.disabled) return;
    this.activeItem.set(item.id);
    this.itemClick.emit(item);
  }
  ngOnInit(): void {
    console.log('[menu] direction', this.direction())
  }
}
