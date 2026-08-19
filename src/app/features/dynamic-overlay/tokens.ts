import { InjectionToken, WritableSignal } from '@angular/core';

export const OVERLAY_OUTLET_CLOSE_EVENT_TOKEN = new InjectionToken<WritableSignal<boolean>>(
  'OVERLAY_OUTLET_CLOSE_EVENT_TOKEN',
);
