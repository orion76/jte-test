import { DestroyRef, Directive, ElementRef, EventEmitter, inject, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutside {

private elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  @Output() clickOutside = new EventEmitter<MouseEvent>();

  constructor() {
    const handler = (event: MouseEvent) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.clickOutside.emit(event);
      }
    };
    document.addEventListener('click', handler, true);
    this.destroyRef.onDestroy(() => document.removeEventListener('click', handler, true));
  }

}
