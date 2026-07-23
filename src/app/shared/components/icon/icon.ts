import { Component, input, inject, OnInit, DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconRegistry } from './icon-registry';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  imports: [],
  template: '@if (svgContent()) { <span class="icon" [innerHTML]="svgContent()"></span> }',
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; }
    .icon { display: inline-flex; align-items: center; justify-content: center; }
    .icon ::ng-deep svg { display: block; }
  `],
})
export class Icon implements OnInit {
  readonly name = input.required<string>();
  readonly size = input(24);

  protected svgContent = signal<SafeHtml | null>(null);

  private registry = inject(IconRegistry);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.registry
      .get(this.name(), this.size())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((svg) => this.svgContent.set(svg));
  }
}
