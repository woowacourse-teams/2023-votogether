import { useState } from 'react';

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

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
