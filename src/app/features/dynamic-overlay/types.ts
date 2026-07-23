import { Type } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';

export interface IOverlayShowOptions {
  component: Type<any>;
  title: string;
  origin?: HTMLElement;
  data?: Record<string, unknown>;
  panelWidth?: string;
  positions?: ConnectedPosition[];
}
