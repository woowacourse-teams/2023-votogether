import { useQuery, useQueryClient } from '@tanstack/react-query';

import { PostInfo } from '@type/post';

import { getPost, getPostForGuest } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const usePostDetail = (isGuest: boolean, postId: number) => {
  const queryClient = useQueryClient();
  const fetchApi = isGuest ? getPostForGuest : getPost;

  const { data, isError, isLoading, error } = useQuery<PostInfo>(
    [QUERY_KEY.POST_DETAIL, postId],
    () => fetchApi(postId),
    {
      onSuccess: data => {
        return data;
      },
      onError: error => {
        queryClient.invalidateQueries([QUERY_KEY.POST_DETAIL, postId]);
      },
      suspense: true,
    }
  );

  return { data, isError, isLoading, error };
};
