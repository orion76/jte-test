import { Component, ElementRef, Injector, Input, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-desktop-shell',
  imports: [NgComponentOutlet],
  template: `
    <div class="desktop-panel" [style.width]="panelWidth">
      <ng-container *ngComponentOutlet="contentComponent; inputs: contentInputs; injector: contentInjector" />
    </div>
  `,
  styles: `
    :host { display: block; }
    .desktop-panel {
      background: #fff; border-radius: 8px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
      min-width: 280px; overflow: hidden;
    }
  `,
})
export class DesktopShellComponent {
  @Input({ required: true }) contentComponent!: Type<unknown>;
  @Input() contentInputs?: Record<string, unknown>;
  @Input() contentInjector?: Injector;
  @Input() panelWidth?: string;

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
