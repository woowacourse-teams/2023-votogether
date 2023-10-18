import { usePassionUserRanking } from '@hooks/query/ranking/usePassionUserRanking';

import firstRankIcon from '@assets/ranking-first.webp';
import secondRankIcon from '@assets/ranking-second.webp';
import thirdRankIcon from '@assets/ranking-third.webp';

import * as TS from '../RankingTableStyle';

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
    <>
      <S.Table>
        <thead>
          <S.Tr>
            {columnNameList.map(text => (
              <TS.Th key={text}>{text}</TS.Th>
            ))}
          </S.Tr>
        </thead>
        <S.Tbody>
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
                <TS.IconImage src={rankIconUrl[ranker.ranking]} alt={ranker.ranking.toString()} />
              );

              return (
                <S.Tr key={index}>
                  <TS.RankingTd>{rankIcon ?? ranker.ranking}</TS.RankingTd>
                  <S.Td>{ranker.nickname}</S.Td>
                  <S.Td>{ranker.postCount}</S.Td>
                  <S.Td>{ranker.voteCount}</S.Td>
                  <S.Td>{ranker.score}</S.Td>
                </S.Tr>
              );
            })}
          <UserRanking />
        </S.Tbody>
      </S.Table>
    </>
  );
}
