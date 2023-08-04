import { useQuery } from '@tanstack/react-query';

import { getCommentList } from '@api/comment';

import { QUERY_KEY } from '@constants/queryKey';

export const useCommentList = (postId: number) => {
  const { data, error, isLoading } = useQuery(
    [QUERY_KEY.POSTS, postId, QUERY_KEY.COMMENTS],
    () => getCommentList(postId),
    {
      onSuccess: data => {
        return data;
      },
      onError: error => {
        window.console.log('get comment list error', error);
      },
    }
  );

  return { data, error, isLoading };
};
