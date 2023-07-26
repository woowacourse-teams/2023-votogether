import { useState } from 'react';

interface Option {
  id: number;
  name: string;
}

export const useMultiSelect = (initialSelectedOptionList: Option[], optionCountLimit?: number) => {
  const [selectedOptionList, setSelectedOptionList] = useState(initialSelectedOptionList);

  const handleOptionAdd = (newItem: Option) => {
    if (optionCountLimit && optionCountLimit === selectedOptionList.length) {
      alert(`${optionCountLimit}개까지 선택 가능합니다!`);
      return;
    }
    setSelectedOptionList([...selectedOptionList, newItem]);
  };

  const handleOptionDelete = (optionId: number) => {
    setSelectedOptionList(selectedOptionList.filter(option => option.id !== optionId));
  };

  return { selectedOptionList, handleOptionAdd, handleOptionDelete };
};
