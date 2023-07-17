import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostRequest } from '@type/post';

import { createPost } from '@api/jero/post';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation((post: PostRequest) => createPost(post), {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
    onError: () => {
      // mutate가 실패하면, 함수를 실행합니다.
      window.console.log('createPost error');
    },
  });

  return { mutate };
};
