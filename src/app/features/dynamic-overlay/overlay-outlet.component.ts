import { Component, computed, inject, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { OverlayManager } from './overlay-manager';

@Component({
  selector: 'app-overlay-outlet',
  imports: [NgComponentOutlet],
  template: `
    @let opts = overlay();
    @if (opts) {
      <ng-container *ngComponentOutlet="opts.component; inputs: opts.inputs; injector: opts.injector" />
    }
  `,
  styles: [':host { display: contents; }'],
})
export class OverlayOutletComponent {
  readonly outletId = input('default');
  private overlayManager = inject(OverlayManager);

  private outlets = this.overlayManager.outlets;
  protected overlay = computed(() => this.outlets().get(this.outletId()));
}
