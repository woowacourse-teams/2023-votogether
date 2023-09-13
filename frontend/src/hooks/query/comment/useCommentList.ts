import { useQuery } from '@tanstack/react-query';

import { getCommentList } from '@api/comment';

import { QUERY_KEY } from '@constants/queryKey';

export const useCommentList = (postId: number) => {
  const { data, error, isLoading } = useQuery(
    [QUERY_KEY.POSTS, postId, QUERY_KEY.COMMENTS],
    () => getCommentList(postId),
    {
      suspense: true,
    }
  );

  return { data, error, isLoading };
};
