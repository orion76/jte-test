import { Type } from '@angular/core';

export interface IOverlayShowOptions {
  component: Type<any>;
  title: string;
  position?: { x: number; y: number };
}
