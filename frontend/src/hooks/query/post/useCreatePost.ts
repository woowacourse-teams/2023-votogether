import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '@api/post';

import { DEFAULT_CATEGORY_ID, DEFAULT_KEYWORD, SORTING, STATUS } from '@constants/post';
import { QUERY_KEY } from '@constants/queryKey';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    (post: FormData) => createPost(post),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          QUERY_KEY.POSTS,
          SORTING.LATEST,
          STATUS.PROGRESS,
          DEFAULT_CATEGORY_ID,
          DEFAULT_KEYWORD,
        ]);
      },
      onError: error => {
        window.console.log('createPost error', error);
      },
    }
  );

  return { mutate, isLoading, isSuccess, isError, error };
};
