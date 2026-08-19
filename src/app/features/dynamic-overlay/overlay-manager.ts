import { Injectable } from '@angular/core';
import { IOverlayManager, IOverlayOpenOptions, TOpoenSignal } from './types';



@Injectable({ providedIn: 'root' })
export class OverlayManager implements IOverlayManager {
  readonly outlets: Map<string, TOpoenSignal> = new Map();

  register(id: string, openSignal: TOpoenSignal) {
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
