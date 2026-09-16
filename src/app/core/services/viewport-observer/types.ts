import { WritableSignal } from '@angular/core';

export type UViewport = 'desktop' | 'mobile';
export interface IViewportObserver {
  viewport: WritableSignal<UViewport>;
}
