import { useInfiniteQuery } from '@tanstack/react-query';

import { PostList } from '@type/post';

import { getPostList } from '@api/wus/postList';

import { PostStatusType, PostSortingType } from '@components/post/PostListPage/constants/option';

interface UsePostListParams {
  postSorting: PostSortingType;
  postStatus: PostStatusType;
}

const MAX_LIST_LENGTH = 10;

export const usePostList = ({ postSorting, postStatus }: UsePostListParams) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PostList>(
      ['posts', postSorting, postStatus],
      ({ pageParam = 0 }) => getPostList({ postSorting, postStatus, pages: pageParam }),
      {
        getNextPageParam: lastPage => {
          if (lastPage.postList.length !== MAX_LIST_LENGTH) return;

          return lastPage.pageNumber + 1;
        },
      }
    );

  return { data, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
