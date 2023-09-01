import { Link } from 'react-router-dom';

import firstRankIcon from '@assets/first-rank.svg';
import secondRankIcon from '@assets/second-rank.svg';
import thirdRankIcon from '@assets/third-rank.svg';

import * as RS from '../RankingTableStyle';

import * as S from './style';

interface RankingPostInfo {
  ranking: number;
  nickname: string;
  title: string;
  voteCount: number;
}

const rankIconUrl: Record<number, string> = {
  1: firstRankIcon,
  2: secondRankIcon,
  3: thirdRankIcon,
};

const columnNameList = ['등수', '닉네임', '글 제목', '투표 수'];
const rankingPostInfo: RankingPostInfo = {
  ranking: 1,
  nickname: 'writer',
  title: '이것은 엄청나게 많은 투표가 이루어진 대단한 글이지요',
  voteCount: 10,
};
const rankingPostList: RankingPostInfo[] = new Array(10)
  .fill(rankingPostInfo)
  .map((post, index) => ({ ...post, ranking: index + 1 }));

export default function PopularPost() {
  return (
    <RS.Background>
      <S.Table>
        <S.Tr>
          {columnNameList.map(text => (
            <S.Th key={text}>{text}</S.Th>
          ))}
        </S.Tr>
        {rankingPostList.map(post => {
          const rankIcon = rankIconUrl[post.ranking] && (
            <img src={rankIconUrl[post.ranking]} alt={post.ranking.toString()} />
          );

          return (
            <S.Tr key={post.ranking}>
              <S.RankingTd>{rankIcon ?? post.ranking}</S.RankingTd>
              <S.Td>{post.nickname}</S.Td>
              <S.Td>
                <Link to={'#'}>{post.title}</Link>
              </S.Td>
              <S.Td>{post.voteCount}</S.Td>
            </S.Tr>
          );
        })}
      </S.Table>
    </RS.Background>
  );
}
