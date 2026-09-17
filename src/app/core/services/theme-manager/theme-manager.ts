import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DEVICE_THEMES } from '@app/app-theme.config';
import { IThemeManager, ULayoutTheme } from './types';

@Injectable()
export class ThemeManager implements IThemeManager {
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private themes = inject(DEVICE_THEMES);

  private setStatusBarColor(theme: ULayoutTheme) {
    const color = this.themes[theme].statusBarColor;

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
