import { useInfiniteQuery } from '@tanstack/react-query';

import { PostList, PostListByOptionalOption, PostListByRequiredOption } from '@type/post';

import { getPostList } from '@api/post';

import { POST_AMOUNT_PER_PAGE } from '@constants/api';
import { QUERY_KEY } from '@constants/queryKey';

export const usePostList = (
  requiredOption: Omit<PostListByRequiredOption, 'pageNumber'>,
  optionalOption: PostListByOptionalOption
) => {
  const { postSorting, postStatus, isLoggedIn, postType } = requiredOption;
  const { categoryId, keyword } = optionalOption;

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PostList>(
      [QUERY_KEY.POSTS, postSorting, postStatus, categoryId, keyword, isLoggedIn, postType],
      ({ pageParam = 0 }) =>
        getPostList({ ...requiredOption, pageNumber: pageParam }, optionalOption),
      {
        getNextPageParam: lastPage => {
          if (lastPage.postList.length !== POST_AMOUNT_PER_PAGE) return;

          return lastPage.pageNumber + 1;
        },
        suspense: true,
      }
    );

  const isPostListEmpty = data?.pages[0].postList.length === 0;

  return { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isPostListEmpty };
};
