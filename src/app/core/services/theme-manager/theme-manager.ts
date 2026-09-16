import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { IThemeManager, TLayoutThemes, ULayoutTheme } from './types';

export const deviceThemes: TLayoutThemes = {
  default: { statusBarColor: '#1074CC' },
  'mobile-modal': { statusBarColor: '#ffffff' },
};

@Injectable()
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
