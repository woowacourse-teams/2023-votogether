import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { CommentRequest, createComment } from '@api/comment';

import { QUERY_KEY } from '@constants/queryKey';

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const { mutate, isSuccess, isLoading } = useMutation(
    (newComment: CommentRequest) => createComment(postId, newComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.POSTS, postId, QUERY_KEY.COMMENTS]);

        addMessage('댓글을 작성했습니다.');
      },
      onError: error => {
        const message = error instanceof Error ? error.message : '댓글 작성을 실패했습니다.';
        addMessage(message);
      },
    }
  );

  return { mutate, isSuccess, isLoading };
};
