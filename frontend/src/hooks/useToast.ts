import { useEffect, useState } from 'react';

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
      }, 3000);
    }

    return () => clearTimeout(timeId);
  }, [isOpen]);

  return { isOpen, openComponent };
};
