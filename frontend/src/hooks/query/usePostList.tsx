import { useInfiniteQuery } from '@tanstack/react-query';

import { PostList, PostListByOption } from '@type/post';

import { getPostList } from '@api/postList';

import { POST_LIST_MAX_LENGTH } from '@constants/post';

export const usePostList = ({
  postType,
  postSorting,
  postStatus,
  categoryId = 0,
  keyword = '',
}: Omit<PostListByOption, 'pageNumber'>) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PostList>(
      ['posts', postSorting, postStatus, categoryId, keyword],
      ({ pageParam = 0 }) =>
        getPostList({
          postType,
          postSorting,
          postStatus,
          pageNumber: pageParam,
          categoryId,
          keyword,
        }),
      {
        getNextPageParam: lastPage => {
          if (lastPage.postList.length !== POST_LIST_MAX_LENGTH) return;

          return lastPage.pageNumber + 1;
        },
      }
    );

  return { data, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
