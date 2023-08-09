import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    (post: FormData) => createPost(post),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.USER_INFO, true]);
      },
      onError: error => {
        window.console.log('createPost error', error);
      },
    }
  );

  return { mutate, isLoading, isSuccess, isError, error };
};
