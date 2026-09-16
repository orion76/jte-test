import { InjectionToken } from '@angular/core';
import { IViewportObserver } from './types';
import { ViewportObserver } from './viewport-observer';

export const VIEWPORT_OBSERVER = new InjectionToken<IViewportObserver>('VIEWPORT_OBSERVER', {
  providedIn: 'root',
  factory: () => new ViewportObserver(),
});
