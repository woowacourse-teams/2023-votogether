import { Link } from 'react-router-dom';

import * as RS from '../RankingStyle';

import * as S from './style';

interface RankingPostInfo {
  ranking: number;
  nickname: string;
  title: string;
  voteCount: number;
}

const columnNameList = ['등수', '닉네임', '글 제목', '투표 수'];
const rankingPostInfo: RankingPostInfo = {
  ranking: 1,
  nickname: 'writer',
  title: '이것은 엄청나게 많은 투표가 이루어진 대단한 글이지요',
  voteCount: 10,
};
const rankingPostList: RankingPostInfo[] = new Array(10).fill(rankingPostInfo);

export default function PopularPost() {
  return (
    <RS.Background>
      <S.Table>
        <S.Tr>
          {columnNameList.map(text => (
            <S.Th key={text}>{text}</S.Th>
          ))}
        </S.Tr>
        {rankingPostList.map(post => (
          <S.Tr key={post.ranking}>
            <S.Td>{post.ranking}</S.Td>
            <S.Td>{post.nickname}</S.Td>
            <S.Td>
              <Link to={'#'}>{post.title}</Link>
            </S.Td>
            <S.Td>{post.voteCount}</S.Td>
          </S.Tr>
        ))}
      </S.Table>
    </RS.Background>
  );
}
