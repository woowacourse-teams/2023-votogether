import React, { ChangeEvent, useState } from 'react';

import * as S from './style';
import WritingVoteOption from './WritingVoteOption';

interface WritingVoteOptionType {
  id: number;
  text: string;
  imageUrl?: string;
}

interface WritingVoteOptionListProps {
  optionList: WritingVoteOptionType[];
  handleAddOptionClick: () => void;
  handleDeleteOptionClick: (optionId: number) => void;
  handleRemoveImageClick: (optionId: number) => void;
  handleUploadImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MINIMUM_COUNT = 2;
const MAXIMUM_COUNT = 5;

export default function WritingVoteOptionList() {
  const [optionList, setOpitonList] = useState<WritingVoteOptionType[]>([]);
  const isDeletable = optionList.length > MINIMUM_COUNT;

  return (
    <S.Container>
      {optionList.map(optionItem => (
        <WritingVoteOption
          key={optionItem.id}
          isDeletable={isDeletable}
          text={optionItem.text}
          handleDeleteOptionClick={() => {}}
          imageUrl={optionItem.imageUrl}
        />
      ))}
      {optionList.length < MAXIMUM_COUNT && <button>더하기</button>}
    </S.Container>
  );
}
