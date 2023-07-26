import { useInfiniteQuery } from '@tanstack/react-query';

import { PostList } from '@type/post';

import { getPostList } from '@api/wus/postList';

import { PostSorting, PostStatus } from '@components/post/PostListPage/types';

interface UsePostList {
  postSorting: PostSorting;
  postStatus: PostStatus;
  categoryId?: number;
}

const MAX_LIST_LENGTH = 10;

export const usePostList = ({ postSorting, postStatus, categoryId }: UsePostList) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PostList>(
      ['posts', postSorting, postStatus, categoryId],
      ({ pageParam = 0 }) =>
        getPostList({ postSorting, postStatus, pageNumber: pageParam, categoryId }),
      {
        getNextPageParam: lastPage => {
          if (lastPage.postList.length !== MAX_LIST_LENGTH) return;

          return lastPage.pageNumber + 1;
        },
      }
    );

  return { data, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
