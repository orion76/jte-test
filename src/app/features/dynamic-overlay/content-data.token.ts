import { InjectionToken } from '@angular/core';

export interface OverlayContentData {
  [key: string]: unknown;
}

export const OVERLAY_CONTENT_DATA = new InjectionToken<OverlayContentData>('OVERLAY_CONTENT_DATA');
