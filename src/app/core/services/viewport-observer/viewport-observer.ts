import { BreakpointObserver } from '@angular/cdk/layout';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IViewportObserver, UViewport } from './types';

const MOBILE_SCREEN = '(max-width: 414px)';

@Injectable()
export class ViewportObserver implements IViewportObserver {
  readonly viewport = signal<UViewport>('desktop');

  private breakpoint = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.breakpoint
      .observe([MOBILE_SCREEN])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        if (state.breakpoints[MOBILE_SCREEN]) {
          this.viewport.set('mobile');
        } else {
          this.viewport.set('desktop');
        }
      });
  }
}
