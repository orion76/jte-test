import { InjectionToken } from '@angular/core';
import { ThemeManager } from './theme-manager';
import { IThemeManager } from './types';

export const THEME_MANAGER = new InjectionToken<IThemeManager>('THEME_MANAGER', {
  providedIn: 'root',
  factory: () => new ThemeManager(),
});
