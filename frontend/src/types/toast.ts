export type ToastContentId =
  | 'toast-content'
  | 'drawer-category-toast-content'
  | 'drawer-alarm-toast-content';

export type DrawerToastContentId = Exclude<ToastContentId, 'toast-content'>;
