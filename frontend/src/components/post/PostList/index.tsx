import React, { useEffect } from 'react';

import { usePostList } from '@hooks/query/usePostList';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { usePostRequestInfo } from '@hooks/usePostRequestInfo';
import { useSelect } from '@hooks/useSelect';

import Post from '@components/common/Post';
import Select from '@components/common/Select';
import Skeleton from '@components/common/Skeleton';
import { SORTING_OPTION, STATUS_OPTION } from '@components/post/PostListPage/constants';
import type { PostSorting, PostStatus } from '@components/post/PostListPage/types';

import { SORTING, STATUS } from '@constants/post';

import EmptyPostList from '../EmptyPostList';

import * as S from './style';

export default function PostList() {
  const { postType, postOptionalOption } = usePostRequestInfo();
  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: null,
    rootMargin: '',
    thresholds: 0.1,
  });
  const { selectedOption: selectedStatusOption, handleOptionChange: handleStatusOptionChange } =
    useSelect<PostStatus>(STATUS.PROGRESS);
  const { selectedOption: selectedSortingOption, handleOptionChange: handleSortingOptionChange } =
    useSelect<PostSorting>(SORTING.LATEST);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostList(
    {
      postType,
      postSorting: selectedSortingOption,
      postStatus: selectedStatusOption,
    },
    postOptionalOption
  );

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage, hasNextPage]);

  const isEmptyList = data?.pages[0].postList.length === 0;

  return (
    <S.Container>
      <S.SelectContainer>
        <S.SelectWrapper>
          <Select<PostStatus>
            handleOptionChange={handleStatusOptionChange}
            optionList={STATUS_OPTION}
            selectedOption={STATUS_OPTION[selectedStatusOption]}
          />
        </S.SelectWrapper>
        <S.SelectWrapper>
          <Select<PostSorting>
            handleOptionChange={handleSortingOptionChange}
            optionList={SORTING_OPTION}
            selectedOption={SORTING_OPTION[selectedSortingOption]}
          />
        </S.SelectWrapper>
      </S.SelectContainer>
      <S.PostListContainer>
        {isEmptyList && <EmptyPostList keyword={postOptionalOption.keyword} />}
        {data?.pages.map((postListInfo, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {postListInfo.postList.map((post, index) => {
              if (index === 7) {
                return (
                  <div key={post.postId} ref={targetRef}>
                    <Post isPreview={true} postInfo={post} />
                  </div>
                );
              }
              return <Post key={post.postId} isPreview={true} postInfo={post} />;
            })}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <Skeleton />}
      </S.PostListContainer>
    </S.Container>
  );
}
