import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useDeletePost = (postId: number, isLogged: boolean) => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError, error } = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.USER_INFO, isLogged]);
    },
    onError: error => {
      window.console.log('게시물 삭제에 실패했습니다.', error);
    },
  });

  return { mutate, isSuccess, isError, error };
};