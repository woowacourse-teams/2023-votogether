import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { deleteNotice } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const useDeleteNotice = () => {
  const { addMessage } = useContext(ToastContext);
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    (noticeId: number) => deleteNotice(noticeId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => queryKey[0] === QUERY_KEY.NOTICE,
        });
      },
      onError: error => {
        const errorMessage =
          error instanceof Error ? error.message : '공지 사항 삭제를 실패했습니다';

        addMessage(errorMessage);
      },
    }
  );

  return { mutate, isLoading, isSuccess, isError, error };
};
