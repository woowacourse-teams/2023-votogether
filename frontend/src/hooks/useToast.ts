import { useEffect, useState } from 'react';

import { toastTime } from '@constants/animation';

export const useToast = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openComponent = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;

    if (isOpen) {
      timeId = setTimeout(() => {
        if (isOpen) setIsOpen(false);
      }, toastTime * 1000);
    }

    return () => clearTimeout(timeId);
  }, [isOpen]);

  return { isOpen, openComponent };
};
