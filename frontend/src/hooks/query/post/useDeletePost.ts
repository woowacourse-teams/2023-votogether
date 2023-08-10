import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useDeletePost = (postId: number) => {
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.POSTS]);
    },
    onError: error => {
      window.console.log('게시물 삭제에 실패했습니다.', error);
    },
  });

  return { mutate, isError, error };
};
