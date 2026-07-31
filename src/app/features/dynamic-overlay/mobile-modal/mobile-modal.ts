import { Component, EventEmitter, Injector, Input, Output, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-mobile-modal',
  imports: [NgComponentOutlet],
  templateUrl: './mobile-modal.html',
  styleUrl: './mobile-modal.scss',
})
export class MobileModal {
  @Input() title = '';


  @Output() back = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
