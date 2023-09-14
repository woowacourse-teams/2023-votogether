import { Suspense } from 'react';

import { usePassionUserRanking } from '@hooks/query/ranking/usePassionUserRanking';

import ErrorBoundary from '@pages/ErrorBoundary';

import LoadingSpinner from '@components/common/LoadingSpinner';

import firstRankIcon from '@assets/first-rank.svg';
import secondRankIcon from '@assets/second-rank.svg';
import thirdRankIcon from '@assets/third-rank.svg';

import * as S from './style';
import UserRanking from './UserRanking';

const columnNameList = ['등수', '닉네임', '작성글 수', '투표 수', '점수'];

const rankIconUrl: Record<number, string> = {
  1: firstRankIcon,
  2: secondRankIcon,
  3: thirdRankIcon,
};

export default function PassionUserRanking() {
  const { data: rankerList } = usePassionUserRanking();

  return (
    <S.Table>
      <S.Tr>
        {columnNameList.map(text => (
          <S.Th key={text}>{text}</S.Th>
        ))}
      </S.Tr>
      {rankerList &&
        new Array(10).fill(0).map((_, index) => {
          const ranker = rankerList[index] ?? {
            ranking: '',
            nickname: '',
            postCount: '',
            voteCount: '',
            score: '',
          };

          const rankIcon = rankIconUrl[ranker.ranking] && (
            <img src={rankIconUrl[ranker.ranking]} alt={ranker.ranking.toString()} />
          );

          return (
            <S.Tr key={ranker.ranking}>
              <S.RankingTd>{rankIcon ?? ranker.ranking}</S.RankingTd>
              <S.Td>{ranker.nickname}</S.Td>
              <S.Td>{ranker.postCount}</S.Td>
              <S.Td>{ranker.voteCount}</S.Td>
              <S.Td>{ranker.score}</S.Td>
            </S.Tr>
          );
        })}
      <ErrorBoundary>
        <Suspense
          fallback={
            <S.LoadingSpinnerWrapper>
              <LoadingSpinner size="sm" />
            </S.LoadingSpinnerWrapper>
          }
        >
          <UserRanking />
        </Suspense>
      </ErrorBoundary>
    </S.Table>
  );
}
