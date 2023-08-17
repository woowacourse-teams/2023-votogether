import { useState } from 'react';

export const useSelect = <T,>(initialOption: T) => {
  const [selectedOption, setSelectedOption] = useState<T>(initialOption);

  const handleOptionChange = (option: T) => {
    setSelectedOption(option);
  };

  return { selectedOption, handleOptionChange };
};
