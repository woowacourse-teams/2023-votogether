import { useEffect, useRef, useState } from 'react';

import { TOAST_TIME } from '@constants/animation';

export const useToast = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const timeIdRef = useRef<number>();

  const clear = () => {
    if (timeIdRef.current) {
      window.clearTimeout(timeIdRef.current);
    }
  };

  const openToast = (message: string) => {
    clear();

    setIsOpen(true);
    setToastMessage(message);

    timeIdRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, TOAST_TIME * 1000);
  };

  useEffect(() => {
    return clear;
  }, []);

  return { isOpen, toastMessage, openToast };
};
