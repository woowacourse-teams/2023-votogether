import { useEffect, useState } from 'react';

import { TOAST_TIME } from '@constants/animation';

export const useToast = () => {
  const [isOpen, setIsOpen] = useState(false);
  let timeId: ReturnType<typeof setTimeout>;

  const openComponent = () => {
    setIsOpen(true);

    timeId = setTimeout(() => {
      setIsOpen(false);
    }, TOAST_TIME * 1000);
  };

  useEffect(() => {
    return () => {
      if (!isOpen) clearTimeout(timeId);
    };
  }, [isOpen]);

  return { isOpen, openComponent };
};
