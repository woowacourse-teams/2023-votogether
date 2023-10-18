import { MouseEvent } from 'react';

import { WrittenVoteOptionType } from '@type/post';

import * as S from './style';
import WrittenVoteOption from './WrittenVoteOption';

interface WrittenVoteOptionListProps {
  isPreview: boolean;
  isStatisticsVisible: boolean;
  selectedOptionId: number;
  voteOptionList: WrittenVoteOptionType[];
  handleVoteClick: (newOptionId: number) => void;
  handleImageClick?: (event: MouseEvent<HTMLImageElement>) => void;
}

export default function WrittenVoteOptionList({
  isPreview,
  isStatisticsVisible,
  voteOptionList,
  selectedOptionId,
  handleVoteClick,
  handleImageClick,
}: WrittenVoteOptionListProps) {
  return (
    <S.VoteOptionListContainer aria-label="투표 선택지">
      {voteOptionList.map((voteOption, index) => {
        const isSelected = selectedOptionId === voteOption.id;

        return (
          <WrittenVoteOption
            ariaLabel={`선택지 내용: ${voteOption.text}, 선택지 순서: ${index + 1}번 , 
            ${
              isStatisticsVisible
                ? `투표한 인원: ${voteOption.peopleCount}명, 전체 투표 중 차지 비율: ${voteOption.percent}%, `
                : ''
            }
            ${isSelected ? '투표 완료한 선택지 상태' : '투표하지 않은 선택지 상태'}
            `}
            key={voteOption.id}
            {...voteOption}
            isPreview={isPreview}
            isStatisticsVisible={isStatisticsVisible}
            isSelected={isSelected}
            handleVoteClick={() => handleVoteClick(voteOption.id)}
            handleImageClick={handleImageClick}
          />
        );
      })}
    </S.VoteOptionListContainer>
  );
}
