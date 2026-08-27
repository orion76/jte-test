export type UIconPlace = 'start' | 'end';

export type UButtonType = 'icon-only' | 'text-only' | 'icon-and-text';

export interface IButton {
  id: string;
  buttonType?: UButtonType;
  label?: string;
  ariaLabel?: string;
  icon?: string;
  iconPlace?: UIconPlace;

}
