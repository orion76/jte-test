import { Injectable, signal, inject, DestroyRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ViewportObserver {
  readonly isMobile = signal(false);
  readonly isDesktop = signal(true);

  private breakpoint = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.breakpoint
      .observe([Breakpoints.HandsetPortrait])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        this.isMobile.set(state.matches);
        this.isDesktop.set(!state.matches);
      });
  }
}
