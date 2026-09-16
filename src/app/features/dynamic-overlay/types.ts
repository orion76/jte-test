import { Type, WritableSignal } from '@angular/core';

export type TOpenSignal = WritableSignal<IOverlayOpenOptions | undefined>;
export interface IOverlayOpenOptions {
  component: Type<unknown>;
  inputs?: Record<string, unknown>;
  title?: string;
}

export interface IOverlayManager {
  register(id: string, openSignal: TOpenSignal): void;
  open(outletId: string, outletOptions: IOverlayOpenOptions): boolean;
  close(outletId: string): boolean;
}
