import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

const IS_LOGGED_IN = true;

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    (post: FormData) => createPost(post),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.USER_INFO, IS_LOGGED_IN]);
      },
      onError: error => {
        window.console.log('createPost error', error);
      },
    }
  );

  return { mutate, isLoading, isSuccess, isError, error };
};
