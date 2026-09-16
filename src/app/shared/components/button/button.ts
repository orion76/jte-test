import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { Icon } from '../icon/icon';
import { UImageType } from '../icon/types';
import { IButton, UIconPlace } from './types';

@Component({
  selector: '[app-button]',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses',
    '[attr.aria-label]': 'ariaLabel',
  },
})
export class Button implements OnInit {
  readonly options = input.required<IButton>({ alias: 'app-button' });
  protected readonly baseClass = 'button';

  protected place: UIconPlace | undefined;
  protected ariaLabel!: string;
  protected hostClasses!: string;
  protected icon!: string | undefined;
  protected iconType!: UImageType;

  ngOnInit(): void {
    const options = this.options();
    this.place = this.getPlace(options);
    this.ariaLabel = this.getAriaLabel(options);

    if (options.icon) {
      this.iconType = this.getImageType(options.icon);
    }
    this.hostClasses = this.getHostClasses(options);
  }

  private getPlace({ buttonType, iconPlace }: IButton) {
    if (buttonType === 'text-only') {
      return;
    }
    return iconPlace ?? 'start';
  }
  private getAriaLabel({ ariaLabel, label, id }: IButton) {
    return ariaLabel ?? label ?? id;
  }
  private getImageType(source: string): UImageType {
    if (this.isFilePath(source)) {
      return 'imageUrl';
    }
    if (this.isIconName(source)) {
      return 'svg';
    }
    throw new Error(`The icon source can be either the file name or the SVG icon name: ${source}.`);
  }
  private isFilePath(source: string) {
    const fileRegex = /\.(svg|png|jpg|jpeg|webp)$/i;
    return fileRegex.test(source);
  }
  private isIconName(source: string) {
    const fileRegex = /^[a-z0-9_-]+$/i;
    return fileRegex.test(source);
  }
  getHostClasses({ id, buttonType }: IButton) {
    const classes = [this.baseClass, id];

    const _buttonType = buttonType ?? 'icon-and-text';
    classes.push(_buttonType);

    const sourceType = this.iconType === 'imageUrl' ? 'image' : 'svg';
    classes.push(sourceType);

    return classes.join(' ');
  }
}
