import React from 'react';

import * as S from './style';
import WrittenVoteOption from './WrittenVoteOption';

interface WrittenVoteOptionType {
  id: number;
  text: string;
  peopleCount: number;
  percent: number;
  imageUrl?: string;
}

interface WrittenVoteOptionListProps {
  isPreview: boolean;
  selectedOptionId: number;
  voteOptionList: WrittenVoteOptionType[];
  handleSelectVoteClick: (voteId: number) => void;
}

const NOT_VOTED = 0;

export default function WrittenVoteOptionList({
  isPreview,
  voteOptionList,
  selectedOptionId,
  handleSelectVoteClick,
}: WrittenVoteOptionListProps) {
  return (
    <S.VoteOptionListContainer>
      {voteOptionList.map(voteOption => (
        <WrittenVoteOption
          key={voteOption.id}
          {...voteOption}
          isPreview={isPreview}
          isVote={selectedOptionId !== NOT_VOTED}
          isSelect={selectedOptionId === voteOption.id}
          onClick={() => handleSelectVoteClick(voteOption.id)}
        />
      ))}
    </S.VoteOptionListContainer>
  );
}
