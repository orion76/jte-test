export interface IMenuItemData {
  id: string;
  label?: string;
  icon?: string;
}
export type TMenuItemData = IMenuItemData & { class: string };
