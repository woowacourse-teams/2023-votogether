import React, { useContext, useEffect } from 'react';

import { AuthContext } from '@hooks/context/auth';
import { PostOptionContext } from '@hooks/context/postOption';
import { usePostList } from '@hooks/query/usePostList';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { usePostRequestInfo } from '@hooks/usePostRequestInfo';
import { useSelect } from '@hooks/useSelect';

import Post from '@components/common/Post';
import Select from '@components/common/Select';
import Skeleton from '@components/common/Skeleton';
import { SORTING_OPTION, STATUS_OPTION } from '@components/post/PostListPage/constants';
import type { PostSorting, PostStatus } from '@components/post/PostListPage/types';

import EmptyPostList from '../EmptyPostList';

import * as S from './style';

export default function PostList() {
  const { postType, postOptionalOption } = usePostRequestInfo();
  const { loggedInfo } = useContext(AuthContext);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: null,
    rootMargin: '',
    thresholds: 0.1,
  });

  const { postOption, setPostOption } = useContext(PostOptionContext);

  const { selectedOption: selectedStatusOption, handleOptionChange: handleStatusOptionChange } =
    useSelect<PostStatus>(postOption.status);
  const { selectedOption: selectedSortingOption, handleOptionChange: handleSortingOptionChange } =
    useSelect<PostSorting>(postOption.sorting);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPostListEmpty } = usePostList(
    {
      postType,
      postSorting: selectedSortingOption,
      postStatus: selectedStatusOption,
      isLoggedIn: loggedInfo.isLoggedIn,
    },
    postOptionalOption
  );

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage, hasNextPage]);

  return (
    <S.Container>
      <S.SelectContainer>
        <S.SelectWrapper>
          <Select<PostStatus>
            aria-label={`마감 여부로 게시글 정렬 선택, 현재 옵션은 ${STATUS_OPTION[selectedStatusOption]}`}
            handleOptionChange={(value: PostStatus) => {
              setPostOption({
                ...postOption,
                status: value,
              });
              handleStatusOptionChange(value);
            }}
            optionList={STATUS_OPTION}
            selectedOption={STATUS_OPTION[selectedStatusOption]}
          />
        </S.SelectWrapper>
        <S.SelectWrapper>
          <Select<PostSorting>
            aria-label={`인기순/최신순으로 게시글 정렬 선택, 현재 옵션은 ${SORTING_OPTION[selectedSortingOption]}`}
            handleOptionChange={(value: PostSorting) => {
              setPostOption({
                ...postOption,
                sorting: value,
              });
              handleSortingOptionChange(value);
            }}
            optionList={SORTING_OPTION}
            selectedOption={SORTING_OPTION[selectedSortingOption]}
          />
        </S.SelectWrapper>
      </S.SelectContainer>
      <S.PostListContainer>
        {isPostListEmpty && (
          <EmptyPostList status={selectedStatusOption} keyword={postOptionalOption.keyword} />
        )}
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
        {isFetchingNextPage && <Skeleton isLarge={false} />}
      </S.PostListContainer>
    </S.Container>
  );
}
