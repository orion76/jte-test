import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconRegistry } from './icon-registry';
import { IIconRegistry, ISvgData, UImageType } from './types';

@Component({
  selector: '[app-icon]',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon implements OnInit {
  readonly imageSourceInput = input.required<string>({ alias: 'app-icon' });
  // Alias is part of the attribute-component public API: <span [app-icon]="src" [icon-type]="type">
  // eslint-disable-next-line @angular-eslint/no-input-rename
  readonly imageTypeInput = input<UImageType>(undefined, { alias: 'icon-type' });

  protected imageSource!: string;
  protected imageType!: UImageType;
  protected svgAttributes!: ISvgData;

  private cdr = inject(ChangeDetectorRef);
  private registry: IIconRegistry = inject(IconRegistry);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.imageSource = this.imageSourceInput();
    this.imageType = this.imageTypeInput() ?? 'svg';

    if (this.imageType === 'svg') {
      this.registry
        .get(this.imageSource)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((svgData) => {
          if (!svgData) {
            throw new Error('todo');
          }

          this.svgAttributes = svgData;
          this.cdr.markForCheck();
        });
    }
  }
}
