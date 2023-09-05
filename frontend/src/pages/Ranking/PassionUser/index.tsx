import { PassionUser } from '@type/ranking';

import firstRankIcon from '@assets/first-rank.svg';
import secondRankIcon from '@assets/second-rank.svg';
import thirdRankIcon from '@assets/third-rank.svg';

import * as RS from '../RankingTableStyle';

import * as S from './style';

const columnNameList = ['등수', '닉네임', '작성글 수', '투표 수', '점수'];

const rankIconUrl: Record<number, string> = {
  1: firstRankIcon,
  2: secondRankIcon,
  3: thirdRankIcon,
};

interface PassionUserRankingProps {
  rankerList: PassionUser[];
  userRanking?: PassionUser;
}

export default function PassionUserRanking({ rankerList, userRanking }: PassionUserRankingProps) {
  return (
    <RS.Background>
      <S.Table>
        <S.Tr>
          {columnNameList.map(text => (
            <S.Th key={text}>{text}</S.Th>
          ))}
        </S.Tr>
        {rankerList.map(ranker => {
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
        {userRanking && (
          <S.Tr>
            <S.Td>{userRanking.ranking}</S.Td>
            <S.Td>{userRanking.nickname}</S.Td>
            <S.Td>{userRanking.postCount}</S.Td>
            <S.Td>{userRanking.voteCount}</S.Td>
            <S.Td>{userRanking.score}</S.Td>
          </S.Tr>
        )}
      </S.Table>
    </RS.Background>
  );
}
