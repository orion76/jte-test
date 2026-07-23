import { Injectable, signal, Type } from '@angular/core';
import { IOverlayShowOptions } from './types';

@Injectable({
  providedIn: 'root',
})
export class OverlayManager {
  private activeComponentSignal = signal<IOverlayShowOptions | undefined>(undefined);
  private inputsSignal = signal<Record<string, unknown> | undefined>(undefined);

  // Храним функцию резолва текущего промиса
  private resolveClose: ((value: any) => void) | null = null;

  activeComponent = this.activeComponentSignal.asReadonly();
  inputs = this.inputsSignal.asReadonly();

  // Теперь метод open возвращает Promise<T>
  open<R = any>(
    options: IOverlayShowOptions,
    inputs?: Record<string, unknown>,
  ): Promise<R | undefined> {
    if (this.resolveClose) {
      this.resolveClose(undefined);
    }

    this.inputsSignal.set(inputs || undefined);
    console.log('[OVERLAY]','active comopnent change',options)
    this.activeComponentSignal.set(options);

    return new Promise<R | undefined>((resolve) => {
      this.resolveClose = resolve;
    });
  }

  // Метод close теперь принимает опциональный результат работы слоя
  close(result?: any) {
    this.activeComponentSignal.set(undefined);
    this.inputsSignal.set(undefined);

    if (this.resolveClose) {
      this.resolveClose(result);
      this.resolveClose = null;
    }
  }
}
