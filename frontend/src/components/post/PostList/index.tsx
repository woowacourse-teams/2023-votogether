import { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { PostInfo } from '@type/post';

import { AuthContext } from '@hooks/context/auth';
import { PostOptionContext } from '@hooks/context/postOption';
import { usePostListFeatSWR } from '@hooks/query/usePostListFeatSWR';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { usePostRequestInfo } from '@hooks/usePostRequestInfo';
import { useSelect } from '@hooks/useSelect';

import Post from '@components/common/Post';
import Select from '@components/common/Select';
import Skeleton from '@components/common/Skeleton';
import { SORTING_OPTION, STATUS_OPTION } from '@components/post/PostListPage/constants';
import type { PostSorting, PostStatus } from '@components/post/PostListPage/types';

import { PATH } from '@constants/path';

import EmptyPostList from '../EmptyPostList';

import * as S from './style';

export default function PostList() {
  const topButtonRef = useRef<HTMLButtonElement>(null);
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

  const {
    data: postList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPostListEmpty,
  } = usePostListFeatSWR(
    {
      postType,
      postSorting: selectedSortingOption,
      postStatus: selectedStatusOption,
      isLoggedIn: loggedInfo.isLoggedIn,
    },
    postOptionalOption
  );

  const focusTopContent = () => {
    if (!topButtonRef.current) return;

    topButtonRef.current.focus();
  };

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <S.Container>
      <button ref={topButtonRef} role="contentinfo" aria-label="최상단입니다"></button>
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
      <Link aria-label="게시글 작성 페이지로 이동" to={PATH.POST_WRITE}></Link>
      <S.PostListContainer>
        {!isFetchingNextPage && isPostListEmpty && (
          <EmptyPostList status={selectedStatusOption} keyword={postOptionalOption.keyword} />
        )}
        {postList?.map((post: PostInfo, index) => {
          if (index === postList.length - 1) {
            return (
              <div key={post.postId} ref={targetRef}>
                <Post isPreview={true} postInfo={post} />
              </div>
            );
          }
          return <Post key={post.postId} isPreview={true} postInfo={post} />;
        })}
        <button onClick={focusTopContent} aria-label="스크롤 맨 위로가기"></button>
        <Link aria-label="게시글 작성 페이지로 이동" to={PATH.POST_WRITE}></Link>
        {isFetchingNextPage && <Skeleton isLarge={false} />}
      </S.PostListContainer>
    </S.Container>
  );
}
