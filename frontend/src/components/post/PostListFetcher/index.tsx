import React, { useContext, useEffect } from 'react';

import {
  AuthContext,
  PostOptionContext,
  useIntersectionObserver,
  usePostList,
  usePostRequestInfo,
} from '@hooks';

import Skeleton from '@components/common/Skeleton';

import { PATH } from '@constants/path';

import EmptyPostList from '../EmptyPostList';
import Post from '../Post';

import * as S from './style';

interface PostListFetcherProps {
  handleFocusTopContent: () => void;
}

export default function PostListFetcher({ handleFocusTopContent }: PostListFetcherProps) {
  const { postOption } = useContext(PostOptionContext);
  const { postType, postOptionalOption } = usePostRequestInfo();
  const { loggedInfo } = useContext(AuthContext);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: null,
    rootMargin: '',
    thresholds: 0.1,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPostListEmpty } = usePostList(
    {
      postType,
      postSorting: postOption.sorting,
      postStatus: postOption.status,
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
    <S.PostListContainer>
      {isPostListEmpty && (
        <EmptyPostList status={postOption.status} keyword={postOptionalOption.keyword} />
      )}
      {data?.pages.map((postListInfo, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {postListInfo.postList.map((post, index) => {
            if (index === 7) {
              return <Post key={post.postId} ref={targetRef} isPreview={true} postInfo={post} />;
            }

            return <Post key={post.postId} isPreview={true} postInfo={post} />;
          })}
          <li key={`${pageIndex}UserButton`}>
            <S.HiddenButton onClick={handleFocusTopContent} aria-label="스크롤 맨 위로가기" />
            <S.HiddenLink aria-label="게시글 작성 페이지로 이동" to={PATH.POST_WRITE} />
          </li>
        </React.Fragment>
      ))}
      {isFetchingNextPage && <Skeleton isLarge={false} />}
    </S.PostListContainer>
  );
}
