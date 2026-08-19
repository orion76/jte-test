import { DOCUMENT, inject, Injectable, Renderer2 } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { IThemeManager } from './types';
import { UViewport } from '../viewport-observer/types';

export type ULayoutTheme = 'default' | 'mobile-modal';

export interface ILayoutTheme {
  statusBarColor: string;
}

export type TLayoutThemes = Record<ULayoutTheme, ILayoutTheme>;

export const deviceThemes: TLayoutThemes = {
  default: { statusBarColor: '#1074CC' },
  'mobile-modal': { statusBarColor: '#ffffff' },
};

@Injectable({ providedIn: 'root' })
export class ThemeManager implements IThemeManager {
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  private setStatusBarColor(theme: ULayoutTheme) {
    const color = deviceThemes[theme].statusBarColor;

    this.meta.updateTag({ name: 'theme-color', content: color });
    this.document.body.style.backgroundColor = color;
  }

  private setLayouteTheme(theme: ULayoutTheme) {
    this.setStatusBarColor(theme);
  }
  onOpenMobileModalLayout() {
    this.setLayouteTheme('mobile-modal');
  }
  onCloseMobileModalLayout() {
    this.setLayouteTheme('default');
  }
}
