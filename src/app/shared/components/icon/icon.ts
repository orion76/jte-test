import { Directive, ElementRef, input, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconRegistry } from './icon-registry';

@Directive({
  selector: 'app-icon, [app-icon]',
})
export class Icon implements OnInit {
  readonly name = input.required<string>({ alias: 'app-icon' });
  readonly position = input<'before' | 'after'>('before', { alias: 'icon-position' });

  private el = inject(ElementRef).nativeElement as HTMLElement;
  private registry = inject(IconRegistry);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.registry
      .get(this.name())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((svg) => {
        this.el.insertAdjacentHTML(this.position() === 'after' ? 'beforeend' : 'afterbegin', svg);
      });
  }
}
