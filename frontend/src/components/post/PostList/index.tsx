import React from 'react';

import { usePostList } from '@hooks/query/usePostList';

import Post from '@components/common/Post';

import * as S from './style';

export default function PostList() {
  const { data } = usePostList();

  return (
    <S.Container>
      {data?.map(item => (
        <Post isPreview={true} postInfo={item} />
      ))}
    </S.Container>
  );
}
