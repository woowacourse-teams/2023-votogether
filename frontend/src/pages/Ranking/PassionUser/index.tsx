import firstRankIcon from '@assets/first-rank.svg';
import secondRankIcon from '@assets/second-rank.svg';
import thirdRankIcon from '@assets/third-rank.svg';

import * as RS from '../RankingTableStyle';

import * as S from './style';

//ui 제작을 위한 임의의 타입, 변경가능성 있음
interface RankerInfo {
  ranking: number;
  nickname: string;
  postCount: number;
  voteCount: number;
  score: number;
}

const rankIconUrl: Record<number, string> = {
  1: firstRankIcon,
  2: secondRankIcon,
  3: thirdRankIcon,
};

const columnNameList = ['등수', '닉네임', '작성글 수', '투표 수', '점수'];
const rankerInfo: RankerInfo = {
  ranking: 1,
  nickname: 'gil-dong',
  postCount: 11,
  voteCount: 79,
  score: 134,
};
const userRankingInfo: RankerInfo = {
  ranking: 1111,
  nickname: 'wow',
  postCount: 1,
  voteCount: 3,
  score: 8,
};
const rankerList: RankerInfo[] = new Array(10)
  .fill(rankerInfo)
  .map((ranker, index) => ({ ...ranker, ranking: index + 1 }));

export default function PassionUser() {
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
        <S.Tr>
          <S.Td>{userRankingInfo.ranking}</S.Td>
          <S.Td>{userRankingInfo.nickname}</S.Td>
          <S.Td>{userRankingInfo.postCount}</S.Td>
          <S.Td>{userRankingInfo.voteCount}</S.Td>
          <S.Td>{userRankingInfo.score}</S.Td>
        </S.Tr>
      </S.Table>
    </RS.Background>
  );
}
