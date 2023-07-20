import { WrittenVoteOptionType } from '@type/post';

import { POST } from '@constants/post';

import * as S from './style';
import WrittenVoteOption from './WrittenVoteOption';

interface WrittenVoteOptionListProps {
  isPreview: boolean;
  selectedOptionId: number;
  voteOptionList: WrittenVoteOptionType[];
  handleVoteClick: (newOptionId: number) => void;
}

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
          isVoted={selectedOptionId !== POST.NOT_VOTE}
          isSelected={selectedOptionId === voteOption.id}
          handleVoteClick={() => handleVoteClick(voteOption.id)}
        />
      ))}
    </S.VoteOptionListContainer>
  );
}
