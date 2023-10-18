import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { setEarlyClosePost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useEarlyClosePost = (postId: number) => {
  const queryClient = useQueryClient();
  const LOGGED_IN = true;
  const { addMessage } = useContext(ToastContext);

  const { mutate } = useMutation({
    mutationFn: () => setEarlyClosePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.POST_DETAIL, postId, LOGGED_IN]);
    },
    onError: error => {
      addMessage('게시글 조기마감을 실패했습니다.');
    },
  });

  return { mutate };
};
