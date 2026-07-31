import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { OverlayManager } from '../overlay-manager';
import { IOverlayOutletOptions } from '../types';
import { UViewport } from '../../../core/services/viewport-observer/types';
import { MobileModal } from '../mobile-modal/mobile-modal';

@Component({
  selector: 'app-overlay-outlet',
  imports: [NgComponentOutlet, MobileModal],
  templateUrl: './overlay-outlet.html',
  styleUrl: './overlay-outlet.scss',
})
export class OverlayOutlet implements OnInit {
  readonly outletId = input.required<string>();
  readonly viewport = input.required<UViewport>();
  private overlayManager = inject(OverlayManager);

  protected overlay = signal<IOverlayOutletOptions | undefined>(undefined);
  ngOnInit(): void {
    this.overlayManager.register(this.outletId(), this.overlay);
  }
  closeOverlay() {
    this.overlayManager.close(this.outletId());
  }
}
