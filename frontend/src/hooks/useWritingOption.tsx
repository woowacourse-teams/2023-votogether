import React, { ChangeEvent, ClipboardEvent, useRef, useState } from 'react';

import { POST_WRITING_OPTION } from '@constants/policy';

import { uploadImage } from '@utils/post/uploadImage';

export interface WritingVoteOptionType {
  id: number;
  text: string;
  imageUrl: string;
}

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
    if (optionList.length >= POST_WRITING_OPTION.MAX_COUNT) return;

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

      if (standard === POST_WRITING_OPTION.MAX_LENGTH) {
        event.target.setCustomValidity(
          `선택지 내용은 ${POST_WRITING_OPTION.MAX_LENGTH}자까지 입력 가능합니다.`
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
    if (optionList.length <= POST_WRITING_OPTION.MIN_LENGTH) return;

    const removedOptionList = optionList.filter(optionItem => optionItem.id !== optionId);

    setOptionList(removedOptionList);
  };

  const handlePasteImage = (event: ClipboardEvent<HTMLTextAreaElement>, optionId: number) => {
    const file = event.clipboardData.files[0];

    if (!file) return;

    if (file.type.slice(0, 5) === 'image') {
      event.preventDefault();

      const optionIndex = optionList.findIndex(option => option.id === optionId);

      uploadImage({
        imageFile: file,
        inputElement: contentInputRefList.current[optionIndex],
        setPreviewImageUrl: setPreviewImageUrl(optionId),
      });
    }
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
      setPreviewImageUrl: setPreviewImageUrl(optionId),
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
    handlePasteImage,
  };
};
