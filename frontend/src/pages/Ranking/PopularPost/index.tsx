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

interface PopularPostProps {
  rankingPostList: RankingPost[];
}

export default function PopularPost({ rankingPostList }: PopularPostProps) {
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
              <S.Td>{rankingPost.post.writer}</S.Td>
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
