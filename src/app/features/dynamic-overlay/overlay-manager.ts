import { Injectable, signal, WritableSignal } from '@angular/core';
import { IOverlayManager, IOverlayOutletOptions, UOverlayOutletOptions } from './types';

@Injectable({ providedIn: 'root' })
export class OverlayManager implements IOverlayManager {
  readonly outlets: Map<string, WritableSignal<undefined | IOverlayOutletOptions>> = new Map();

  register(outletId: string, openSignal: WritableSignal<IOverlayOutletOptions | undefined>) {
    this.outlets.set(outletId, openSignal);
  }

  open(options: UOverlayOutletOptions, inputs?: Record<string, unknown>): boolean {
    let outletId = options.outletId || 'default';
    const openSignal = this.outlets.get(outletId);
    if (!openSignal) {
      return false;
    }

    openSignal.set(options);

    return true;
  }
  close(outletId: string) {
    const openSignal = this.outlets.get(outletId);
    if (!openSignal) {
      return false;
    }
    // this.outlets.delete(outletId);
    openSignal.set(undefined);

    return true;
  }
}
