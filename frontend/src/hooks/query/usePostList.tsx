import { useQuery } from '@tanstack/react-query';

import { PostInfo } from '@type/post';

import { getPostList } from '@api/wus/postList';

import { PostStatusType, PostSortingType } from '@components/post/PostListPage/constants/option';

interface UsePostListParams {
  postSorting: PostSortingType;
  postStatus: PostStatusType;
  pages: number;
}

export const usePostList = ({ postSorting, postStatus, pages }: UsePostListParams) => {
  const { data, error, isLoading } = useQuery<PostInfo[]>(
    ['posts', postSorting, postStatus],
    () => getPostList({ postSorting, postStatus, pages }),
    {
      suspense: true,
    }
  );

  return { data, error, isLoading };
};
