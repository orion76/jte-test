import { InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const OVERLAY_CLICK_OUTSIDE = new InjectionToken<Observable<void>>('OVERLAY_CLICK_OUTSIDE');
