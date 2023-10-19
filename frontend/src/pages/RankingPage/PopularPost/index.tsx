import { Link } from 'react-router-dom';

import { usePopularPostRanking } from '@hooks/query/ranking/usePopularPostRanking';

import { PATH } from '@constants/path';

import firstRankIcon from '@assets/ranking-first.webp';
import secondRankIcon from '@assets/ranking-second.webp';
import thirdRankIcon from '@assets/ranking-third.webp';

import * as TS from '../RankingTableStyle';

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
            <TS.Th key={text}>{text}</TS.Th>
          ))}
        </S.Tr>
      </thead>
      <tbody>
        {rankingPostList &&
          rankingPostList.map((rankingPost, index) => {
            const rankIcon = rankIconUrl[rankingPost.ranking] && (
              <TS.IconImage
                src={rankIconUrl[rankingPost.ranking]}
                alt={rankingPost.ranking.toString()}
              />
            );

            return (
              <S.Tr key={index}>
                <TS.RankingTd>{rankIcon ?? rankingPost.ranking}</TS.RankingTd>
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
