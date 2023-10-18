import { useContext, useState } from 'react';

import type { Option } from '@components/common/MultiSelect/types';

import { ToastContext } from './context/toast';

export const useMultiSelect = (initialSelectedOptionList: Option[], optionCountLimit?: number) => {
  const [selectedOptionList, setSelectedOptionList] = useState(initialSelectedOptionList);
  const { addMessage } = useContext(ToastContext);

  const handleOptionAdd = (newItem: Option) => {
    if (optionCountLimit && optionCountLimit === selectedOptionList.length) {
      addMessage(`${optionCountLimit}개까지 선택 가능합니다!`);
      return;
    }

    setSelectedOptionList([...selectedOptionList, newItem]);
  };

  const handleOptionDelete = (optionId: number) => {
    setSelectedOptionList(selectedOptionList.filter(option => option.id !== optionId));
  };

  return { selectedOptionList, handleOptionAdd, handleOptionDelete };
};
