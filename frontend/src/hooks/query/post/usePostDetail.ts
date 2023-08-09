import { useQuery } from '@tanstack/react-query';

import { PostInfo } from '@type/post';

import { getPost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const usePostDetail = (postId: number) => {
  const { data, error, isLoading } = useQuery<PostInfo>(
    [QUERY_KEY.POST_DETAIL, postId],
    () => getPost(postId),
    {
      onSuccess: data => {
        return data;
      },
    }
  );

  return { data, error, isLoading };
};
