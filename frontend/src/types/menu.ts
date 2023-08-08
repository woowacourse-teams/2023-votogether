export type MenuColor = 'black' | 'red';

export interface MenuItem {
  content: string;
  color: MenuColor;
  action: string;
}
