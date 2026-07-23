import { Component, input, output } from '@angular/core';
import { Icon } from '../../icon/icon';
import { IMenuItemData } from '../types';

@Component({
  selector: 'app-menu-item',
  imports: [Icon],
  templateUrl: './menu-item.html',
})
export class MenuItem {
  readonly itemData = input.required<IMenuItemData>();
  readonly isActive = input<Boolean>();
  readonly itemClick = output<IMenuItemData>();

  protected onClick(item: IMenuItemData): void {
    if (item.disabled) return;
    this.itemClick.emit(item);
  }
}
