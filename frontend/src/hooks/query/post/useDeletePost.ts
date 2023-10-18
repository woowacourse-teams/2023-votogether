import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { deletePost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useDeletePost = (postId: number, isLogged: boolean) => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.USER_INFO, isLogged]);

      addMessage('게시글을 삭제했습니다.');
    },
    onError: error => {
      const message = error instanceof Error ? error.message : '게시글 삭제를 실패했습니다.';
      addMessage(message);
    },
  });

  return { mutate, isSuccess, isLoading };
};
