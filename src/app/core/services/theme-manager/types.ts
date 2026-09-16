export type ULayoutTheme = 'default' | 'mobile-modal';

export interface ILayoutTheme {
  statusBarColor: string;
}

export type TLayoutThemes = Record<ULayoutTheme, ILayoutTheme>;

export interface IThemeManager {
  onOpenMobileModalLayout(): void;
  onCloseMobileModalLayout(): void;
}
