import { Component, Injector, inject, effect, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

import { OverlayManager } from '../overlay-manager';
import { ViewportObserver } from '../../../core/services/viewport-observer';
import { MobileShellComponent } from '../mobile-shell.component';
import { DesktopShellComponent } from '../desktop-shell.component';
import { OVERLAY_CONTENT_DATA } from '../content-data.token';
import { OVERLAY_CLICK_OUTSIDE } from '../click-outside.token';
import { IOverlayShowOptions } from '../types';

@Component({
  selector: 'app-viewports-overlay',
  template: '',
})
export class ViewportsOverlay implements OnDestroy {
  private overlayManager = inject(OverlayManager);
  private viewportObserver = inject(ViewportObserver);
  private overlay = inject(Overlay);
  private parentInjector = inject(Injector);

  private overlayRef?: OverlayRef;

  constructor() {
    effect(() => {
      const options = this.overlayManager.activeComponent();
      this.viewportObserver.isMobile();
      if (!options) {
        this.destroyOverlay();
        return;
      }
      this.destroyOverlay();
      this.createOverlay(options);
    });
  }

  private createOverlay(options: IOverlayShowOptions): void {
    const contentInjector = Injector.create({
      parent: this.parentInjector,
      providers: [
        { provide: OVERLAY_CONTENT_DATA, useValue: options.data ?? {} },
      ],
    });

    if (this.viewportObserver.isMobile()) {
      this.createMobileOverlay(options, contentInjector);
    } else {
      this.createDesktopOverlay(options, contentInjector);
    }
  }

  private createMobileOverlay(options: IOverlayShowOptions, contentInjector: Injector): void {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: false,
    });

    const portal = new ComponentPortal(MobileShellComponent, null, this.parentInjector);
    const shellRef = this.overlayRef.attach(portal);

    shellRef.instance.title = options.title;
    shellRef.instance.contentComponent = options.component;
    shellRef.instance.contentInjector = contentInjector;
    shellRef.instance.contentInputs = this.overlayManager.inputs();

    shellRef.instance.close.subscribe(() => this.overlayManager.close());
    shellRef.instance.back.subscribe(() => this.overlayManager.close());
  }

  private createDesktopOverlay(options: IOverlayShowOptions, contentInjector: Injector): void {
    const positionStrategy = options.origin
      ? this.overlay.position().flexibleConnectedTo(options.origin).withPositions(
          options.positions ?? [
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 },
            { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -8 },
          ],
        ).withFlexibleDimensions(false).withPush(true)
      : this.overlay.position().global().centerHorizontally().centerVertically();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const clickOutside$ = new Subject<void>();
    const enrichedInjector = Injector.create({
      parent: contentInjector,
      providers: [
        { provide: OVERLAY_CLICK_OUTSIDE, useValue: clickOutside$.asObservable() },
      ],
    });

    const portal = new ComponentPortal(DesktopShellComponent, null, this.parentInjector);
    const shellRef = this.overlayRef.attach(portal);

    shellRef.instance.contentComponent = options.component;
    shellRef.instance.contentInjector = enrichedInjector;
    shellRef.instance.contentInputs = this.overlayManager.inputs();
    shellRef.instance.panelWidth = options.panelWidth;

    if (options.origin) {
      this.playMorphAnimation(options.origin, shellRef.instance.elementRef.nativeElement);
    }

    this.overlayRef.outsidePointerEvents().subscribe(() => clickOutside$.next());
    this.overlayRef.backdropClick().subscribe(() => this.overlayManager.close());
  }

  private playMorphAnimation(originEl: HTMLElement, targetEl: HTMLElement): void {
    const originRect = originEl.getBoundingClientRect();

    requestAnimationFrame(() => {
      const targetRect = targetEl.getBoundingClientRect();

      const dx = originRect.left - targetRect.left;
      const dy = originRect.top - targetRect.top;
      const scaleX = Math.max(originRect.width / targetRect.width, 0.01);
      const scaleY = Math.max(originRect.height / targetRect.height, 0.01);

      targetEl.style.transformOrigin = 'top left';
      targetEl.style.transition = 'none';
      targetEl.style.opacity = '0.6';
      targetEl.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;

      requestAnimationFrame(() => {
        targetEl.style.transition = 'transform 220ms cubic-bezier(0.2, 0, 0, 1), opacity 180ms ease-out';
        targetEl.style.transform = 'translate(0, 0) scale(1, 1)';
        targetEl.style.opacity = '1';
      });
    });
  }

  private destroyOverlay(): void {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  ngOnDestroy(): void {
    this.destroyOverlay();
  }
}
