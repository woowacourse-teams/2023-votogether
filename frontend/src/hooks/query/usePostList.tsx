import { useInfiniteQuery } from '@tanstack/react-query';

import { PostList, PostListByOption } from '@type/post';

import { getPostList } from '@api/postList';

const MAX_LIST_LENGTH = 10;

export const usePostList = ({
  content,
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
          content,
          postSorting,
          postStatus,
          pageNumber: pageParam,
          categoryId,
          keyword,
        }),
      {
        getNextPageParam: lastPage => {
          if (lastPage.postList.length !== MAX_LIST_LENGTH) return;

          return lastPage.pageNumber + 1;
        },
      }
    );

  return { data, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
