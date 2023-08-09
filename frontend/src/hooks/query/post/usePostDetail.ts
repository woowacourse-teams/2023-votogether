import { useQuery } from '@tanstack/react-query';

import { PostInfo } from '@type/post';

import { getPost, getPostForGuest } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const usePostDetail = (isGuest: boolean, postId: number) => {
  const fetchApi = isGuest ? getPostForGuest : getPost;

  const { data, isError, isLoading } = useQuery<PostInfo>(
    [QUERY_KEY.POST_DETAIL, postId],
    () => fetchApi(postId),
    {
      onSuccess: data => {
        return data;
      },
      onError: error => {
        window.console.error(error);
      },
    }
  );

  return { data, isError, isLoading };
};
