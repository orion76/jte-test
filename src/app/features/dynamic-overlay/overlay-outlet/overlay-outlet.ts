import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  input,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { UViewport } from '@core/services/viewport-observer/types';
import { MobileModalLayout } from '@shared/components';
import { OVERLAY_MANAGER } from '../injection-token';
import { OVERLAY_OUTLET_CLOSE_EVENT_TOKEN } from '../tokens';
import { IOverlayManager, IOverlayOpenOptions } from '../types';

@Component({
  selector: 'app-overlay-outlet',
  imports: [NgComponentOutlet, MobileModalLayout],
  templateUrl: './overlay-outlet.html',
  styleUrl: './overlay-outlet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'overlay',
    '[class]': 'hostClasses()',
  },
})
export class OverlayOutlet implements OnInit {
  readonly outletId = input.required<string>();
  readonly viewport = input.required<UViewport>();

  private overlayManager: IOverlayManager = inject(OVERLAY_MANAGER);
  parentInjector = inject(Injector);
  overlayInjector!: Injector;

  protected openSignal = signal<IOverlayOpenOptions | undefined>(undefined);

  protected closeSignal = signal(false);

  headerTemplate = viewChild<TemplateRef<unknown>>('headerTmp');

  constructor() {
    this.overlayInjector = this.createInjector();
    effect(() => {
      if (this.closeSignal()) {
        setTimeout(() => {
          this.overlayManager.close(this.outletId());
          this.closeSignal.set(false);
        }, 0);
      }
    });
  }

  ngOnInit(): void {
    this.overlayManager.register(this.outletId(), this.openSignal);
  }

  private createInjector(): Injector {
    return Injector.create({
      providers: [{ provide: OVERLAY_OUTLET_CLOSE_EVENT_TOKEN, useValue: this.closeSignal }],
      parent: this.parentInjector,
    });
  }
  protected closeOverlay() {
    this.overlayManager.close(this.outletId());
  }
  protected hostClasses(): string {
    return `${this.outletId()}`;
  }
}
