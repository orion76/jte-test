import { InjectionToken } from '@angular/core';
import { IconRegistry } from './icon-registry';
import { IIconRegistry } from './types';

export const ICON_REGISTRY = new InjectionToken<IIconRegistry>('ICON_REGISTRY', {
  providedIn: 'root',
  factory: () => new IconRegistry(),
});
