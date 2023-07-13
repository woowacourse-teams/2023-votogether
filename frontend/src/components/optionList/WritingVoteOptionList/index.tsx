import React from 'react';

import { useWritingOption } from '@hooks/useWritingOption';
import type { WritingVoteOptionType } from '@hooks/useWritingOption';

import AddButton from '@components/common/AddButton';

import * as S from './style';
import WritingVoteOption from './WritingVoteOption';

interface WritingVoteOptionListProps {
  initialOptionList?: WritingVoteOptionType[];
}

const MINIMUM_COUNT = 2;
const MAXIMUM_COUNT = 5;

export default function WritingVoteOptionList({ initialOptionList }: WritingVoteOptionListProps) {
  const { optionList, addOption, deleteOption, removeImage, handleUploadImage } =
    useWritingOption(initialOptionList);
  const isDeletable = optionList.length > MINIMUM_COUNT;

  return (
    <S.Container>
      {optionList.map(optionItem => (
        <WritingVoteOption
          key={optionItem.id}
          optionId={optionItem.id}
          isDeletable={isDeletable}
          text={optionItem.text}
          handleDeleteOptionClick={() => deleteOption(optionItem.id)}
          handleRemoveImageClick={() => removeImage(optionItem.id)}
          handleUploadImage={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleUploadImage(event, optionItem.id)
          }
          imageUrl={optionItem.imageUrl}
        />
      ))}
      {optionList.length < MAXIMUM_COUNT && (
        <S.AddButtonWrapper>
          <AddButton size="md" onClick={addOption} />
        </S.AddButtonWrapper>
      )}
    </S.Container>
  );
}
