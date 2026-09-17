import { InjectionToken, Provider } from '@angular/core';
import { TLayoutThemes } from './core/services/theme-manager/types';

const deviceThemes: TLayoutThemes = {
  default: { statusBarColor: '#1074CC' },
  'mobile-modal': { statusBarColor: '#ffffff' },
};

export const DEVICE_THEMES = new InjectionToken<TLayoutThemes>('DEVICE_THEMES');
export function provideDeviceThemes(): Provider[] {
  return [{ provide: DEVICE_THEMES, useValue: deviceThemes }];
}
