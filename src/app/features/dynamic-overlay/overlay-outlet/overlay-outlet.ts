import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EmbeddedViewRef,
  inject,
  Injector,
  input,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MobileModalLayout } from '@shared/components';
import { UViewport } from '../../../core/services/viewport-observer/types';
import { OverlayManager } from '../overlay-manager';
import { OVERLAY_OUTLET_CLOSE_EVENT_TOKEN } from '../tokens';
import { IOverlayOpenOptions } from '../types';

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

  private overlayManager = inject(OverlayManager);
  parentInjector = inject(Injector);
  overlayInjector!: Injector;

  protected openSignal = signal<IOverlayOpenOptions | undefined>(undefined);

  protected closeSignal = signal(false);

  headerTemplate = viewChild<TemplateRef<unknown>>('headerTmp');

  private activeViews: EmbeddedViewRef<unknown>[] = [];

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
  ngOnDestroy() {
    // Финальная очистка при уничтожении всего компонента
    this.destroyActiveViews();
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
  private destroyActiveViews() {
    this.activeViews.forEach((view) => {
      if (!view.destroyed) {
        view.destroy();
      }
    });
    this.activeViews = [];
  }
}
