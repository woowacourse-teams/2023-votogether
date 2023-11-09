import { useContext, useEffect, useRef } from 'react';

import { DrawerToastContentId } from '@type/toast';

import { ToastContext } from './context/toast';

export const useDrawer = (placement: 'left' | 'right', toastElementId: DrawerToastContentId) => {
  const drawerRef = useRef<HTMLDialogElement>(null);
  const { setElementId } = useContext(ToastContext);

  const openDrawer = () => {
    if (!drawerRef.current) return;

    setElementId(toastElementId);
    drawerRef.current.showModal();
    drawerRef.current.style.transform = 'translateX(0)';
  };

  const closeDrawer = () => {
    if (!drawerRef.current) return;

    drawerRef.current.style.transform =
      placement === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
    setElementId('toast-content');

    setTimeout(() => {
      if (!drawerRef.current) return;

      drawerRef.current.close();
    }, 300);
  };

  useEffect(() => {
    if (!drawerRef.current) return;

    drawerRef.current.style.transform =
      placement === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
  }, [placement]);

  return { drawerRef, openDrawer, closeDrawer };
};
