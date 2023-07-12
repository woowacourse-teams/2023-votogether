import React, { useState } from 'react';

export interface WritingVoteOptionType {
  id: number;
  text: string;
  imageUrl?: string;
}

const MIN_COUNT = 2;
const MAX_COUNT = 5;

const MAX_FILE_SIZE = 5000000;

const INIT_OPTION_LIST = [
  { id: Math.floor(Math.random() * 100000), text: '', imageUrl: '' },
  { id: Math.floor(Math.random() * 100000), text: '', imageUrl: '' },
];

export const useWritingOption = (initialOptionList: WritingVoteOptionType[] = INIT_OPTION_LIST) => {
  const [optionList, setOptionList] = useState<WritingVoteOptionType[]>(initialOptionList);

  const addOption = () => {
    if (optionList.length >= MAX_COUNT) return;

    const updatedOptionList = [
      ...optionList,
      { id: Math.floor(Math.random() * 100000), text: '', imageUrl: '' },
    ];

    setOptionList(updatedOptionList);
  };

  const deleteOption = (optionId: number) => {
    if (optionList.length <= MIN_COUNT) return;

    const removedOptionList = optionList.filter(optionItem => optionItem.id !== optionId);

    setOptionList(removedOptionList);
  };

  const removeImage = (optionId: number) => {
    const updatedOptionList = optionList.map(optionItem => {
      if (optionItem.id === optionId) {
        return { ...optionItem, imageUrl: '' };
      }

      return optionItem;
    });

    setOptionList(updatedOptionList);
  };

  const handleUploadImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionId: number
  ) => {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    if (file.size > MAX_FILE_SIZE) {
      return console.error('사진의 사이즈가 5MB를 초과합니다.');
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedOptionList = optionList.map(optionItem => {
        if (optionItem.id === optionId) {
          return { ...optionItem, imageUrl: reader.result?.toString() };
        }

        return optionItem;
      });

      setOptionList(updatedOptionList);
    };

    reader.readAsDataURL(file);
  };

  return { optionList, addOption, deleteOption, removeImage, handleUploadImageChange };
};
