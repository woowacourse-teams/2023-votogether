import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { createPost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

const IS_LOGGED_IN = true;

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const { mutate, isLoading, isSuccess } = useMutation((post: FormData) => createPost(post), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.USER_INFO, IS_LOGGED_IN]);
      addMessage('게시글 작성을 완료했습니다.');
    },
    onError: error => {
      const message = error instanceof Error ? error.message : '회원 탈퇴를 실패했습니다.';
      addMessage(message);
    },
  });

  return { mutate, isLoading, isSuccess };
};
