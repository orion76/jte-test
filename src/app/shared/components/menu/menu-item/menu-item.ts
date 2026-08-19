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
  readonly itemClick = output<IMenuItemData>();

  protected onClick(item: IMenuItemData): void {
    this.itemClick.emit(this.itemData());
  }
}
