import { NgComponentOutlet } from '@angular/common';
import {
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
  ViewEncapsulation,
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
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'overlay-outlet',
  },
})
export class OverlayOutlet implements OnInit {
  readonly outletId = input.required<string>();
  readonly viewport = input.required<UViewport>();
  readonly state = computed(() => {
    return this.openSignal() !== undefined ? 'is-opened' : 'is-closed';
  });

  private overlayManager = inject(OverlayManager);
  parentInjector = inject(Injector);
  overlayInjector!: Injector;

  protected openSignal = signal<IOverlayOpenOptions | undefined>(undefined);

  protected closeSignal = signal(false);

  headerTemplate = viewChild<TemplateRef<unknown>>('headerTmp');

  private activeViews: EmbeddedViewRef<unknown>[] = [];
  projectedContent = computed(() => {
    this.destroyActiveViews();
    const header = this.headerTemplate();
    if (!header) return [];

    const headerView = header.createEmbeddedView({}, this.parentInjector);

    headerView.detectChanges();

    this.activeViews = [headerView];
    return [
      headerView.rootNodes, // для первого <ng-content select="[header]">
    ];
  });
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
  // protected hostClasses(): string {
  //   const prefix = 'overlay-outlet';
  //   return `${prefix}-id--${this.outletId()} ${prefix}-state--${this.state()}`;
  // }
  private destroyActiveViews() {
    this.activeViews.forEach((view) => {
      if (!view.destroyed) {
        view.destroy();
      }
    });
    this.activeViews = [];
  }
}
