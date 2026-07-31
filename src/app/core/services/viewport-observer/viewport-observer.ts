import { Injectable, signal, inject, DestroyRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IViewportObserver, UViewport } from './types';

@Injectable({ providedIn: 'root' })
export class ViewportObserver implements IViewportObserver{
  readonly viewport = signal<UViewport>('desktop');

  private breakpoint = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.breakpoint
      .observe([Breakpoints.HandsetPortrait])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        this.viewport.set(state.matches ? 'mobile' : 'desktop');
      });
  }
}
