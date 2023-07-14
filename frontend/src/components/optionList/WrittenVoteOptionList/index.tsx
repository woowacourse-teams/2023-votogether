import { WrittenVoteOptionType } from '@type/post';

import * as S from './style';
import WrittenVoteOption from './WrittenVoteOption';

interface WrittenVoteOptionListProps {
  isPreview: boolean;
  selectedOptionId: number;
  voteOptionList: WrittenVoteOptionType[];
  handleVoteClick: (optionId: number) => void;
}

const NOT_VOTED = 0;

export default function WrittenVoteOptionList({
  isPreview,
  voteOptionList,
  selectedOptionId,
  handleVoteClick,
}: WrittenVoteOptionListProps) {
  return (
    <S.VoteOptionListContainer>
      {voteOptionList.map(voteOption => (
        <WrittenVoteOption
          key={voteOption.id}
          {...voteOption}
          isPreview={isPreview}
          isVoted={selectedOptionId !== NOT_VOTED}
          isSelected={selectedOptionId === voteOption.id}
          handleVoteClick={() => handleVoteClick(voteOption.id)}
        />
      ))}
    </S.VoteOptionListContainer>
  );
}
