import { WrittenVoteOptionType } from '@type/post';

import * as S from './style';
import WrittenVoteOption from './WrittenVoteOption';

interface WrittenVoteOptionListProps {
  isPreview: boolean;
  isStatisticsVisible: boolean;
  selectedOptionId: number;
  voteOptionList: WrittenVoteOptionType[];
  handleVoteClick: (newOptionId: number) => void;
}

export default function WrittenVoteOptionList({
  isPreview,
  isStatisticsVisible,
  voteOptionList,
  selectedOptionId,
  handleVoteClick,
}: WrittenVoteOptionListProps) {
  return (
    <S.VoteOptionListContainer aria-label="투표 선택지">
      {voteOptionList.map((voteOption, index) => (
        <WrittenVoteOption
          ariaLabel={`${index + 1}번`}
          key={voteOption.id}
          {...voteOption}
          isPreview={isPreview}
          isStatisticsVisible={isStatisticsVisible}
          isSelected={selectedOptionId === voteOption.id}
          handleVoteClick={() => handleVoteClick(voteOption.id)}
        />
      ))}
    </S.VoteOptionListContainer>
  );
}
