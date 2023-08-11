import { useEffect, useRef, useState } from 'react';

import { TOAST_TIME } from '@constants/animation';

export const useToast = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const timeIdRef = useRef<number>();

  const clear = () => {
    if (timeIdRef.current) {
      window.clearTimeout(timeIdRef.current);
    }
  };

  const openToast = (message: string) => {
    clear();

    setIsToastOpen(true);
    setToastMessage(message);

    timeIdRef.current = window.setTimeout(() => {
      setIsToastOpen(false);
    }, TOAST_TIME * 1000);
  };

  useEffect(() => {
    return clear;
  }, []);

  return { isToastOpen, toastMessage, openToast };
};
