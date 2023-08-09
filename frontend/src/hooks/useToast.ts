import { useEffect, useState } from 'react';

import { toastTime } from '@constants/animation';

export const useToast = () => {
  const [isOpen, setIsOpen] = useState(false);
  let timeId: ReturnType<typeof setTimeout>;

  const openComponent = () => {
    setIsOpen(true);

    timeId = setTimeout(() => {
      if (isOpen) setIsOpen(false);
    }, toastTime * 1000);
  };

  useEffect(() => {
    return () => {
      if (!isOpen) clearTimeout(timeId);
    };
  }, [isOpen]);

  return { isOpen, openComponent };
};
