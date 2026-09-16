import { InjectionToken } from '@angular/core';
import { OverlayManager } from './overlay-manager';
import { IOverlayManager } from './types';

export const OVERLAY_MANAGER = new InjectionToken<IOverlayManager>('OVERLAY_MANAGER', {
  providedIn: 'root',
  factory: () => new OverlayManager(),
});
