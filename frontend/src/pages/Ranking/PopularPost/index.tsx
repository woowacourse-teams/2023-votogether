import { Link } from 'react-router-dom';

import { usePopularPostRanking } from '@hooks/query/ranking/usePopularPostRanking';

import { PATH } from '@constants/path';

import firstRankIcon from '@assets/first-rank.svg';
import secondRankIcon from '@assets/second-rank.svg';
import thirdRankIcon from '@assets/third-rank.svg';

import * as S from './style';

const rankIconUrl: Record<number, string> = {
  1: firstRankIcon,
  2: secondRankIcon,
  3: thirdRankIcon,
};

const columnNameList = ['등수', '닉네임', '글 제목', '투표 수'];

export default function PopularPost() {
  const { data: rankingPostList } = usePopularPostRanking();

  return (
    <S.Table>
      <thead>
        <S.Tr>
          {columnNameList.map(text => (
            <S.Th key={text}>{text}</S.Th>
          ))}
        </S.Tr>
      </thead>
      <tbody>
        {rankingPostList &&
          rankingPostList.map((rankingPost, index) => {
            const rankIcon = rankIconUrl[rankingPost.ranking] && (
              <img src={rankIconUrl[rankingPost.ranking]} alt={rankingPost.ranking.toString()} />
            );

            return (
              <S.Tr key={index}>
                <S.RankingTd>{rankIcon ?? rankingPost.ranking}</S.RankingTd>
                <S.Td>{rankingPost.post.writer}</S.Td>
                <S.Td>
                  <Link to={`${PATH.POST}/${rankingPost.post.id}`}>{rankingPost.post.title}</Link>
                </S.Td>
                <S.Td>{rankingPost.post.voteCount}</S.Td>
              </S.Tr>
            );
          })}
      </tbody>
    </S.Table>
  );
}
