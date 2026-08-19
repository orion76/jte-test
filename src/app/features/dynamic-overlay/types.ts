import { Type, WritableSignal } from '@angular/core';

export type TOpoenSignal = WritableSignal<IOverlayOpenOptions | undefined>;
export interface IOverlayOpenOptions {
  component: Type<unknown>;
  inputs?: Record<string, unknown>;
  title?: string;
}

export interface IOverlayManager {
  register(id: string, openSignal: TOpoenSignal): void;
  open(outletId: string, outletOptions: IOverlayOpenOptions): boolean;
}
