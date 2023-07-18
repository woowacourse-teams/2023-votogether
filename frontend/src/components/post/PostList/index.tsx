import React from 'react';

import { usePostList } from '@hooks/query/usePostList';
import { useSelect } from '@hooks/useSelect';

import Post from '@components/common/Post';

import { PostSortingType, PostStatusType } from '../PostListPage/constants/option';

import * as S from './style';

export default function PostList() {
  const { selectedOption: selectedSortingOption, handleOptionChange: handleSortingOptionChange } =
    useSelect<PostSortingType>('latest');
  const { selectedOption: selectedStatusOption, handleOptionChange: handleStatusOptionChange } =
    useSelect<PostStatusType>('progress');

  const { data: postList } = usePostList({
    postSorting: selectedSortingOption,
    postStatus: selectedStatusOption,
  });

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
        {postList?.map(post => (
          <Post key={post.postId} isPreview={true} postInfo={post} />
        ))}
      </S.PostListContainer>
    </S.Container>
  );
}
