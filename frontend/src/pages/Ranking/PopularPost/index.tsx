import { Link } from 'react-router-dom';

import { RankingPost } from '@type/ranking';

import { PATH } from '@constants/path';

import firstRankIcon from '@assets/first-rank.svg';
import secondRankIcon from '@assets/second-rank.svg';
import thirdRankIcon from '@assets/third-rank.svg';

import * as RS from '../RankingTableStyle';

import * as S from './style';

const rankIconUrl: Record<number, string> = {
  1: firstRankIcon,
  2: secondRankIcon,
  3: thirdRankIcon,
};

const columnNameList = ['등수', '닉네임', '글 제목', '투표 수'];
const rankingPostInfo: RankingPost = {
  rank: 1,
  post: {
    id: 29,
    nickname: 'writer',
    title: '이것은 엄청나게 많은 투표가 이루어진 대단한 글이지요',
    voteCount: 10,
  },
};
const rankingPostList: RankingPost[] = new Array(10)
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
        {rankingPostList.map(rankingPost => {
          const rankIcon = rankIconUrl[rankingPost.rank] && (
            <img src={rankIconUrl[rankingPost.rank]} alt={rankingPost.rank.toString()} />
          );

          return (
            <S.Tr key={rankingPost.rank}>
              <S.RankingTd>{rankIcon ?? rankingPost.rank}</S.RankingTd>
              <S.Td>{rankingPost.post.nickname}</S.Td>
              <S.Td>
                <Link to={`${PATH.POST}/${rankingPost.post.id}`}>{rankingPost.post.title}</Link>
              </S.Td>
              <S.Td>{rankingPost.post.voteCount}</S.Td>
            </S.Tr>
          );
        })}
      </S.Table>
    </RS.Background>
  );
}
