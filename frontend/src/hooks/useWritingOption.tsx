import React, { ChangeEvent, useRef, useState } from 'react';

import { uploadImage } from '@utils/post/uploadImage';

const MAX_WRITING_LENGTH = 50;

export interface WritingVoteOptionType {
  id: number;
  text: string;
  imageUrl: string;
}

const MIN_COUNT = 2;
const MAX_COUNT = 5;

const INIT_OPTION_LIST = [
  { id: Math.floor(Math.random() * 100000), text: '', imageUrl: '', isServerId: false },
  { id: Math.floor(Math.random() * 100000), text: '', imageUrl: '', isServerId: false },
];

export const useWritingOption = (initialOptionList?: WritingVoteOptionType[]) => {
  const [optionList, setOptionList] = useState(
    initialOptionList
      ? initialOptionList.map(option => ({ ...option, isServerId: true }))
      : INIT_OPTION_LIST
  );
  const contentInputRefList = useRef<HTMLInputElement[]>([]);

  const addOption = () => {
    if (optionList.length >= MAX_COUNT) return;

    const updatedOptionList = [
      ...optionList,
      { id: Math.floor(Math.random() * 100000), text: '', imageUrl: '', isServerId: false },
    ];

    setOptionList(updatedOptionList);
  };

  const writingOption =
    (optionId: number) => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { value } = event.target;
      const standard = value.length;

      if (standard === MAX_WRITING_LENGTH) {
        event.target.setCustomValidity(
          `선택지 내용은 ${MAX_WRITING_LENGTH}자까지 입력 가능합니다.`
        );
        event.target.reportValidity();
        return;
      }

      const updateOptionList = optionList.map(optionItem => {
        return optionItem.id !== optionId
          ? optionItem
          : {
              ...optionItem,
              text: value,
            };
      });

      event.target.setCustomValidity('');
      setOptionList(updateOptionList);
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
    contentInputRefList.current &&
      contentInputRefList.current.forEach(inputElement => {
        if (inputElement?.id === optionId.toString()) inputElement.value = '';
      });
  };

  const setPreviewImageUrl = (optionId: number) => (imageUrl: string) => {
    const updatedOptionList = optionList.map(optionItem => {
      if (optionItem.id === optionId) {
        return { ...optionItem, imageUrl };
      }

      return optionItem;
    });

    setOptionList(updatedOptionList);
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    optionId: number
  ) => {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    uploadImage({
      imageFile: file,
      inputElement: event.target,
      setPreviewUrlFunc: setPreviewImageUrl(optionId),
    });
  };

  return {
    optionList,
    addOption,
    writingOption,
    deleteOption,
    removeImage,
    handleUploadImage,
    contentInputRefList,
  };
};
