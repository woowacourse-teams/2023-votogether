import { PostStatus } from '../PostListPage/types';

import * as S from './style';

interface EmptyPostListProps {
  status: PostStatus;
  keyword?: string;
}

export default function EmptyPostList({ keyword, status }: EmptyPostListProps) {
  if (keyword) {
    return (
      <S.Container>
        <div>
          {status !== 'all' && <S.Title>현재 조건에는</S.Title>}
          <S.Keyword>'{keyword}'</S.Keyword>
          <S.Title>와(과) 일치하는 검색결과가 없습니다.</S.Title>
        </div>
        <S.TextCardContainer>
          {status !== 'all' && <S.TextCard>전체 옵션으로 사용해보세요.</S.TextCard>}
          <S.TextCard>모든 단어의 철자가 정확한지 확인하세요.</S.TextCard>
          <S.TextCard>다른 검색어를 사용해 보세요.</S.TextCard>
          <S.TextCard>더 일반적인 검색어를 사용해 보세요.</S.TextCard>
          <S.TextCard>키워드 수를 줄여보세요.</S.TextCard>
        </S.TextCardContainer>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>해당 되는 조건의 게시글이 없습니다.</S.Title>
    </S.Container>
  );
}
