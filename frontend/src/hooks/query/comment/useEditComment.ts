import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Comment } from '@type/comment';

import { ToastContext } from '@hooks/context/toast';

import { editComment } from '@api/comment';

import { QUERY_KEY } from '@constants/queryKey';

export const useEditComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const { mutate, isSuccess, isLoading } = useMutation(
    (updatedComment: Comment) => editComment(postId, commentId, updatedComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.POSTS, postId, QUERY_KEY.COMMENTS]);
      },
      onError: error => {
        const message = error instanceof Error ? error.message : '댓글 수정을 실패했습니다.';
        addMessage(message);
      },
    }
  );

  return { mutate, isSuccess, isLoading };
};
