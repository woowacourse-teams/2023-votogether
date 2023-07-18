import { useQuery } from '@tanstack/react-query';

import { PostInfo } from '@type/post';

import { getPostList } from '@api/wus/postList';

import { PostStatusType, PostSortingType } from '@components/post/PostListPage/constants/option';

interface UsePostListParams {
  postSorting: PostSortingType;
  postStatus: PostStatusType;
}

export const usePostList = ({ postSorting, postStatus }: UsePostListParams) => {
  const { data, error, isLoading } = useQuery<PostInfo[]>(
    ['posts'],
    () => getPostList({ postSorting, postStatus }),
    {
      suspense: true,
    }
  );

  return { data, error, isLoading };
};
