import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-modal',
  templateUrl: './mobile-modal.html',
  styleUrl: './mobile-modal.scss',
})
export class MobileModal {
  @Input() title = '';


  @Output() back = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
