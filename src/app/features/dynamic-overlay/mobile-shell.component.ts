import { Component, EventEmitter, Injector, Input, Output, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-mobile-shell',
  imports: [NgComponentOutlet],
  template: `
    <div class="mobile-modal">
      <div class="mobile-modal__header">
        <button class="mobile-modal__action" type="button" (click)="back.emit()" aria-label="Назад">
          ←
        </button>
        <span class="mobile-modal__title">{{ title }}</span>
        <button class="mobile-modal__action" type="button" (click)="close.emit()" aria-label="Закрыть">
          ✕
        </button>
      </div>

      <div class="mobile-modal__body">
        <ng-container *ngComponentOutlet="contentComponent; inputs: contentInputs; injector: contentInjector" />
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
    .mobile-modal {
      position: fixed; inset: 0; background: #fff; z-index: 1000;
      display: flex; flex-direction: column;
      animation: slideUp 220ms ease-out;
    }
    .mobile-modal__header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px; border-bottom: 1px solid #e5e5e5; flex: 0 0 auto;
    }
    .mobile-modal__title { font-weight: 600; font-size: 16px; }
    .mobile-modal__action {
      border: none; background: transparent; font-size: 18px; line-height: 1;
      padding: 8px; cursor: pointer;
    }
    .mobile-modal__body { flex: 1 1 auto; overflow: auto; padding: 16px; }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  `,
})
export class MobileShellComponent {
  @Input() title = '';
  @Input({ required: true }) contentComponent!: Type<unknown>;
  @Input() contentInputs?: Record<string, unknown>;
  @Input() contentInjector?: Injector;

  @Output() back = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
