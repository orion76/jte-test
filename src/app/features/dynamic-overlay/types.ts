import { Type, WritableSignal } from '@angular/core';
import { UViewport } from '../../core/services/viewport-observer/types';

export interface IOverlayOutletOptions {
  outletId: string;
  component: Type<unknown>;
  inputs?: Record<string, unknown>;
}

export interface IOvelayOutletMobileOptions extends IOverlayOutletOptions {
  title: string;
}

export interface IOvelayOutletDesktopOptions extends IOverlayOutletOptions {}

export type UOverlayOutletOptions = IOvelayOutletMobileOptions | IOvelayOutletDesktopOptions;

export interface IOverlayManager {
  register(overlayId: string, openSignal: WritableSignal<IOverlayOutletOptions | undefined>): void;
  open(options: UOverlayOutletOptions): boolean;
}
