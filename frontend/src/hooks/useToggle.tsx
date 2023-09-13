import { useState } from 'react';

export const useToggle = (isInitialOpen = false) => {
  const [isOpen, setIsOpen] = useState(isInitialOpen);

  const openComponent = () => {
    setIsOpen(true);
  };

  const closeComponent = () => {
    setIsOpen(false);
  };

  const toggleComponent = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return { isOpen, openComponent, closeComponent, toggleComponent };
};
