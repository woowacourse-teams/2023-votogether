import { useState } from 'react';

import { WrittenVoteOptionType } from '@type/post';
import { Size } from '@type/style';

import { useFetch } from '@hooks/useFetch';
import { useToast } from '@hooks/useToast';

import { getOptionStatistics } from '@api/voteResult';

import LoadingSpinner from '@components/common/LoadingSpinner';
import Toast from '@components/common/Toast';
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
  const { isToastOpen, openToast, toastMessage } = useToast();

  const {
    data: voteResult,
    errorMessage,
    isLoading,
  } = useFetch(() => getOptionStatistics({ postId, optionId: voteOption.id }));

  const toggleOptionStatistics = () => {
    if (!voteResult) return openToast('투표 통계 불러오기를 실패했습니다.');

    setIsStatisticsOpen(!isStatisticsOpen);
  };

  return (
    <S.Container>
      <WrittenVoteOption
        ariaLabel="투표 통계"
        key={voteOption.id}
        {...voteOption}
        isPreview={false}
        isStatisticsVisible={true}
        isSelected={isSelectedOption}
        handleVoteClick={toggleOptionStatistics}
      />
      <S.StatisticsContainer>
        {isStatisticsOpen && voteResult && (
          <>
            <S.ScreenReaderDirection>
              투표 선택지를 클릭하여 투표 통계를 닫을 수 있습니다.
            </S.ScreenReaderDirection>
            <VoteStatistics voteResultResponse={voteResult} size={size} />
          </>
        )}
        {isStatisticsOpen && isLoading && (
          <S.LoadingWrapper>
            <LoadingSpinner size="sm" />
          </S.LoadingWrapper>
        )}
        {isStatisticsOpen && errorMessage}
      </S.StatisticsContainer>
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </S.Container>
  );
}
