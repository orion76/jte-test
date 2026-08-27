import { Injectable, signal, inject, DestroyRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IViewportObserver, UViewport } from './types';

const MOBILE_SCREEN = '(max-width: 439px)';
const DESCTOP_SCREEN = '(min-width: 439px)';

@Injectable({ providedIn: 'root' })
export class ViewportObserver implements IViewportObserver {
  readonly viewport = signal<UViewport>('desktop');

  private breakpoint = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.breakpoint
      .observe([MOBILE_SCREEN, DESCTOP_SCREEN])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        if (state.breakpoints[MOBILE_SCREEN]) {
          this.viewport.set('mobile');
        }
        if (state.breakpoints[DESCTOP_SCREEN]) {
          this.viewport.set('desktop');
        }
      });
  }
}
