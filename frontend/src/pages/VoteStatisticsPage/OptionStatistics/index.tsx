import { Suspense, useState } from 'react';

import { WrittenVoteOptionType } from '@type/post';
import { Size } from '@type/style';

import ErrorBoundary from '@pages/ErrorBoundary';

import LoadingSpinner from '@components/common/LoadingSpinner';
import WrittenVoteOption from '@components/optionList/WrittenVoteOptionList/WrittenVoteOption';

import StatisticsWrapper from '../StatisticsWrapper';

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

  const toggleOptionStatistics = () => {
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
        {!isStatisticsOpen && (
          <S.ScreenReaderDirection>
            투표 선택지를 클릭하여 투표 통계를 열어 확인할 수 있습니다.
          </S.ScreenReaderDirection>
        )}
        {isStatisticsOpen && (
          <>
            <S.ScreenReaderDirection>
              투표 선택지를 클릭하여 투표 통계를 닫을 수 있습니다.
            </S.ScreenReaderDirection>
            <ErrorBoundary hasRetryInteraction={true}>
              <Suspense
                fallback={
                  <S.LoadingWrapper>
                    <LoadingSpinner size="sm" />
                  </S.LoadingWrapper>
                }
              >
                <StatisticsWrapper postId={postId} optionId={voteOption.id} size={size} />
              </Suspense>
            </ErrorBoundary>
          </>
        )}
      </S.StatisticsContainer>
    </S.Container>
  );
}
