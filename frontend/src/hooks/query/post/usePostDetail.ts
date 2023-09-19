import { useQuery, useQueryClient } from '@tanstack/react-query';

import { PostInfo } from '@type/post';

import { getPost, getPostForGuest } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

import { checkClosedPost } from '@utils/time';

export const usePostDetail = (isLoggedIn: boolean, postId: number) => {
  const fetchApi = isLoggedIn ? getPost : getPostForGuest;

  const queryClient = useQueryClient();
  const POST_DETAIL_QUERY_KEY = [QUERY_KEY.POST_DETAIL, postId, isLoggedIn];

  const { data, isError, isLoading, error } = useQuery<PostInfo>(
    POST_DETAIL_QUERY_KEY,
    () => fetchApi(postId),
    {
      suspense: true,

      onSuccess: data => {
        if (checkClosedPost(data.deadline)) {
          queryClient.setQueryDefaults(POST_DETAIL_QUERY_KEY, {
            cacheTime: 60 * 60 * 1000,
            staleTime: 60 * 60 * 1000,
          });
        }

        return data;
      },
    }
  );

  return { data, isError, isLoading, error };
};
