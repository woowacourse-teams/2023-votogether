import { useInfiniteQuery } from '@tanstack/react-query';

import { PostList, PostListByOptionalOption, PostListByRequiredOption } from '@type/post';

import { getPostList } from '@api/postList';

import { POST_LIST_MAX_LENGTH } from '@constants/post';
import { QUERY_KEY } from '@constants/queryKey';

export const usePostList = (
  requiredOption: Omit<PostListByRequiredOption, 'pageNumber'>,
  optionalOption: PostListByOptionalOption
) => {
  const { postSorting, postStatus } = requiredOption;
  const { categoryId, keyword } = optionalOption;

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PostList>(
      [QUERY_KEY.POSTS, postSorting, postStatus, categoryId, keyword],
      ({ pageParam = 0 }) =>
        getPostList({ ...requiredOption, pageNumber: pageParam }, optionalOption),
      {
        getNextPageParam: lastPage => {
          if (lastPage.postList.length !== POST_LIST_MAX_LENGTH) return;

          return lastPage.pageNumber + 1;
        },
        suspense: true,
      }
    );

  return { data, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
