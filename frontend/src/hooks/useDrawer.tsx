import { useContext, useEffect, useRef } from 'react';

import { ToastContext } from './context/toast';

export const useDrawer = (placement: 'left' | 'right') => {
  const drawerRef = useRef<HTMLDialogElement>(null);
  const { setElementId } = useContext(ToastContext);

  const openDrawer = () => {
    if (!drawerRef.current) return;

    setElementId('drawer-toast-content');
    drawerRef.current.showModal();
    drawerRef.current.style.transform = 'translateX(0)';
  };

  const closeDrawer = () => {
    if (!drawerRef.current) return;

    drawerRef.current.style.transform =
      placement === 'left' ? 'translateX(-100%)' : 'translateX(100%)';

    setTimeout(() => {
      if (!drawerRef.current) return;

      setElementId('toast-content');
      drawerRef.current.close();
    }, 300);
  };

  useEffect(() => {
    if (!drawerRef.current) return;

    drawerRef.current.style.transform =
      placement === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
  }, []);

  return { drawerRef, openDrawer, closeDrawer };
};
