import React from 'react';

import { usePostList } from '@hooks/query/usePostList';

import Post from '@components/common/Post';

import * as S from './style';

export default function PostList() {
  const { data } = usePostList();

  return (
    <S.Container>
      <S.SelectContainer>
        <select defaultValue="진행중">
          <option>전체</option>
          <option>진행중</option>
          <option>마감완료</option>
        </select>
        <select defaultValue="최신순">
          <option>인기순</option>
          <option>최신순</option>
        </select>
      </S.SelectContainer>
      <S.PostListContainer>
        {data?.map(item => (
          <Post key={item.postId} isPreview={true} postInfo={item} />
        ))}
      </S.PostListContainer>
    </S.Container>
  );
}
