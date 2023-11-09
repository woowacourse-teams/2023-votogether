import { MouseEvent, useRef, useState } from 'react';

export const useSelect = <T,>(initialOption: T) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<T>(initialOption);

  const handleOptionChange = (option: T) => {
    setSelectedOption(option);
    setIsSelectOpen(false);
  };

  const toggleSelect = () => {
    setIsSelectOpen(prev => !prev);
  };

  const handleCloseClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!selectRef.current) return;

    const modalBoundary = selectRef.current.getBoundingClientRect();

    if (
      modalBoundary.left > event.clientX ||
      modalBoundary.right < event.clientX ||
      modalBoundary.top > event.clientY ||
      modalBoundary.bottom < event.clientY
    ) {
      setIsSelectOpen(false);
    }
  };

  return {
    selectRef,
    selectedOption,
    handleOptionChange,
    isSelectOpen,
    toggleSelect,
    handleCloseClick,
  };
};
