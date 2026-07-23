import { NgComponentOutlet } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { OverlayManager } from '../overlay-manager';
import { ViewportObserver } from '../../../core/services/viewport-observer';
import { Icon } from '../../../shared/components';

@Component({
  selector: 'app-viewports-overlay',
  imports: [NgComponentOutlet,Icon],
  templateUrl: './viewports-overlay.html',
})
export class ViewportsOverlay {
  public readonly title = input<string>()
  public readonly overlayManager = inject(OverlayManager);
  public readonly viewportObserver = inject(ViewportObserver);
  log(...args: any[]){
    console.log('[VIEWPORTS]',...args);
  }
}
