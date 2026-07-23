import { Injectable, Injector, computed, inject, signal, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { OVERLAY_CONTENT_DATA } from './content-data.token';
import { OVERLAY_CLICK_OUTSIDE } from './click-outside.token';
import { IOverlayShowOptions } from './types';

export interface OverlayOutletData {
  component: Type<unknown>;
  inputs?: Record<string, unknown>;
  injector: Injector;
}

@Injectable({ providedIn: 'root' })
export class OverlayManager {
  private parentInjector = inject(Injector);
  readonly outlets = signal<Map<string, OverlayOutletData>>(new Map());
  private clickOutside$ = new Map<string, Subject<void>>();

  activeComponent = computed(() => {
    const d = this.outlets().get('default');
    return d ? { component: d.component, title: '', data: d.inputs } as IOverlayShowOptions : undefined;
  });

  inputs = computed(() => this.outlets().get('default')?.inputs);

  open<R = any>(
    outletIdOrOptions: string | IOverlayShowOptions,
    optionsOrInputs?: IOverlayShowOptions | Record<string, unknown>,
    inputs?: Record<string, unknown>,
  ): Promise<R | undefined> {
    let outletId = 'default';
    let options: IOverlayShowOptions;
    let injectorInputs: Record<string, unknown> | undefined;

    if (typeof outletIdOrOptions === 'string') {
      outletId = outletIdOrOptions;
      options = optionsOrInputs as IOverlayShowOptions;
      injectorInputs = inputs;
    } else {
      options = outletIdOrOptions;
      injectorInputs = optionsOrInputs as Record<string, unknown> | undefined;
    }

    const click$ = new Subject<void>();
    this.clickOutside$.set(outletId, click$);

    const contentInjector = Injector.create({
      parent: this.parentInjector,
      providers: [
        { provide: OVERLAY_CONTENT_DATA, useValue: options.data ?? {} },
        { provide: OVERLAY_CLICK_OUTSIDE, useValue: click$.asObservable() },
      ],
    });

    this.outlets.update(m => {
      const next = new Map(m);
      next.set(outletId, {
        component: options.component,
        inputs: injectorInputs ?? options.data,
        injector: contentInjector,
      });
      return next;
    });

    return new Promise<R | undefined>(() => {});
  }

  notifyClickOutside(outletId: string): void {
    this.clickOutside$.get(outletId)?.next();
  }

  close(outletId?: string) {
    this.outlets.update(m => {
      const next = new Map(m);
      if (outletId) {
        next.delete(outletId);
        this.clickOutside$.get(outletId)?.complete();
        this.clickOutside$.delete(outletId);
      } else {
        next.clear();
        this.clickOutside$.forEach(s => s.complete());
        this.clickOutside$.clear();
      }
      return next;
    });
  }
}
