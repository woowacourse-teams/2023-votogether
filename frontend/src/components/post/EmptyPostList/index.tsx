import { PostStatus } from '@pages/HomePage/types';

import * as S from './style';

interface EmptyPostListProps {
  status: PostStatus;
  keyword?: string;
}

export default function EmptyPostList({ keyword, status }: EmptyPostListProps) {
  const statusText = status === 'progress' ? "'진행중'을" : "'마감완료'를";
  const direction = `현재 옵션인 ${statusText} '전체'로 변경해보세요.`;

  if (keyword) {
    return (
      <S.Container>
        <section>
          <S.Keyword>'{keyword}'</S.Keyword>
          <S.Title>와(과) 일치하는 검색결과가 없습니다.</S.Title>
        </section>
        <S.TextCardContainer>
          {status !== 'all' && <S.TextCard>{direction}</S.TextCard>}
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
