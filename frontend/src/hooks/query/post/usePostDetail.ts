import { useQuery } from '@tanstack/react-query';

import { PostInfo } from '@type/post';

import { getPost, getPostForGuest } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const usePostDetail = (isLoggedIn: boolean, postId: number) => {
  const fetchApi = isLoggedIn ? getPost : getPostForGuest;

  const { data, isError, isLoading, error } = useQuery<PostInfo>(
    [QUERY_KEY.POST_DETAIL, postId, isLoggedIn],
    () => fetchApi(postId),
    {
      suspense: true,
    }
  );

  return { data, isError, isLoading, error };
};
