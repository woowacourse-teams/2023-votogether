import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { editPost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useEditPost = (postId: number) => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const { mutate, isLoading, isSuccess } = useMutation(
    (updatedPost: FormData) => editPost(postId, updatedPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.POST_DETAIL, postId]);
      },
      onError: error => {
        const message = error instanceof Error ? error.message : '게시글 수정을 실패했습니다.';
        addMessage(message);
      },
    }
  );

  return { mutate, isLoading, isSuccess };
};
