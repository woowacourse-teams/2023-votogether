import { useState } from 'react';

import { WrittenVoteOptionType } from '@type/post';
import { Size } from '@type/style';

import { useFetch } from '@hooks/useFetch';

import { getOptionStatistics } from '@api/voteResult';

import LoadingSpinner from '@components/common/LoadingSpinner';
import WrittenVoteOption from '@components/optionList/WrittenVoteOptionList/WrittenVoteOption';
import VoteStatistics from '@components/VoteStatistics';

import * as S from './style';

interface OptionStatisticsProps {
  postId: number;
  isSelectedOption: boolean;
  voteOption: WrittenVoteOptionType;
  size: Size;
}

export default function OptionStatistics({
  postId,
  voteOption,
  isSelectedOption,
  size,
}: OptionStatisticsProps) {
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const {
    data: voteResult,
    errorMessage,
    isLoading,
  } = useFetch(() => getOptionStatistics({ postId, optionId: voteOption.id }));

  const toggleOptionStatistics = () => {
    setIsStatisticsOpen(!isStatisticsOpen);
  };

  return (
    <S.Container>
      <WrittenVoteOption
        ariaLabel=""
        key={voteOption.id}
        {...voteOption}
        isPreview={false}
        isVoted={true}
        isSelected={isSelectedOption}
        handleVoteClick={toggleOptionStatistics}
      />
      <S.StatisticsContainer>
        {isStatisticsOpen && voteResult && <VoteStatistics voteResult={voteResult} size={size} />}
        {isStatisticsOpen && isLoading && (
          <S.LoadingWrapper>
            <LoadingSpinner size="sm" />
          </S.LoadingWrapper>
        )}
        {isStatisticsOpen && errorMessage}
      </S.StatisticsContainer>
    </S.Container>
  );
}
