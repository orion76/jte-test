import {
  InjectionToken,
  Provider
} from '@angular/core';
import { IMenuItemData } from './shared/components';

const pagesMenu: IMenuItemData[] = [
  { id: 'links', label: 'Ссылки', icon: 'link' },
  { id: 'contacts', label: 'Контакты', icon: 'contacts' },
  { id: 'tags', label: 'Теги', icon: 'tag' },
  { id: 'favorites', label: 'Избранное', icon: 'favorites' },
  { id: 'history', label: 'Посещения', icon: 'history' },
];

export const PAGES_MENU = new InjectionToken<IMenuItemData[]>('PAGES_MENU');
export function provideMenus(): Provider[] {
  return [{ provide: PAGES_MENU, useValue: pagesMenu }];
}
