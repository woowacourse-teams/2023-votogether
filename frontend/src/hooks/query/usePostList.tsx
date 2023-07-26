import { useInfiniteQuery } from '@tanstack/react-query';

import { PostList } from '@type/post';

import { getPostList } from '@api/postList';

import { PostRequestKind, PostSorting, PostStatus } from '@components/post/PostListPage/types';

interface UsePostList {
  requestKind: PostRequestKind;
  postSorting: PostSorting;
  postStatus: PostStatus;
  categoryId?: number;
}

const MAX_LIST_LENGTH = 10;

export const usePostList = ({ requestKind, postSorting, postStatus, categoryId }: UsePostList) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PostList>(
      ['posts', postSorting, postStatus, categoryId],
      ({ pageParam = 0 }) =>
        getPostList({ requestKind, postSorting, postStatus, pageNumber: pageParam, categoryId }),
      {
        getNextPageParam: lastPage => {
          if (lastPage.postList.length !== MAX_LIST_LENGTH) return;

          return lastPage.pageNumber + 1;
        },
      }
    );

  return { data, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
