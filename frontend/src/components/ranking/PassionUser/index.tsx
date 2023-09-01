import * as RS from '../RankingStyle';

import * as S from './style';

//ui 제작을 위한 임의의 타입, 변경가능성 있음
interface RankerInfo {
  ranking: number;
  nickname: string;
  postCount: number;
  voteCount: number;
  score: number;
}

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
const rankerList: RankerInfo[] = new Array(10).fill(rankerInfo);

export default function PassionUser() {
  return (
    <RS.Background>
      <S.Table>
        <S.Tr>
          {columnNameList.map(text => (
            <S.Th key={text}>{text}</S.Th>
          ))}
        </S.Tr>
        {rankerList.map(ranker => (
          <S.Tr key={ranker.ranking}>
            <S.Td>{ranker.ranking}</S.Td>
            <S.Td>{ranker.nickname}</S.Td>
            <S.Td>{ranker.postCount}</S.Td>
            <S.Td>{ranker.voteCount}</S.Td>
            <S.Td>{ranker.score}</S.Td>
          </S.Tr>
        ))}
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
