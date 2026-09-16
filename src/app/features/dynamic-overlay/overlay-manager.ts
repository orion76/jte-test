import { Injectable } from '@angular/core';
import { IOverlayManager, IOverlayOpenOptions, TOpenSignal } from './types';

@Injectable({ providedIn: 'root' })
export class OverlayManager implements IOverlayManager {
  readonly outlets: Map<string, TOpenSignal> = new Map<string, TOpenSignal>();

  register(id: string, openSignal: TOpenSignal) {
    this.outlets.set(id, openSignal);
  }

  open(outletId: string, outletOptions: IOverlayOpenOptions): boolean {
    const openSignal = this.outlets.get(outletId);
    if (!openSignal) {
      return false;
    }
    openSignal.set(outletOptions);

    return true;
  }
  close(outletId: string) {
    const openSignal = this.outlets.get(outletId);
    if (!openSignal) {
      return false;
    }
    openSignal.set(undefined);

    return true;
  }
}
