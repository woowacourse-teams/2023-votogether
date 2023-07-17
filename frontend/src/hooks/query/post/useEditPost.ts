import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostRequest } from '@type/post';

import { editPost } from '@api/jero/post';

export const useEditPost = (postId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation((updatedPost: PostRequest) => editPost(postId, updatedPost), {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', postId]);
    },
    onError: () => {
      window.console.log('editPost error');
    },
  });

  return { mutate };
};
