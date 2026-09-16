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
import { IconRegistry, ISvgData } from './icon-registry';

export type UImageType = 'imageUrl' | 'svg';

@Component({
  selector: '[icon]',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon implements OnInit {
  readonly imageSourceInput = input.required<string>({ alias: 'icon' });
  readonly imageTypeInput = input<UImageType>(undefined, { alias: 'icon-type' });


  protected imageSource!: string;
  protected imageType!: UImageType;
  protected svgAttributes!: ISvgData;


  private cdr = inject(ChangeDetectorRef);
  private registry = inject(IconRegistry);
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
