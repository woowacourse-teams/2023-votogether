import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { deleteComment } from '@api/comment';

import { QUERY_KEY } from '@constants/queryKey';

export const useDeleteComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const { mutate, isLoading } = useMutation(() => deleteComment(postId, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.POSTS, postId, QUERY_KEY.COMMENTS]);
      addMessage('댓글이 삭제되었습니다.');
    },
    onError: error => {
      const message = error instanceof Error ? error.message : '댓글 삭제를 실패했습니다.';
      addMessage(message);
    },
  });

  return { mutate, isLoading };
};
