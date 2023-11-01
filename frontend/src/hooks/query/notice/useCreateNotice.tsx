import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NoticeRequest } from '@type/notice';

import { ToastContext } from '@hooks/context/toast';

import { createNotice } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const useCreateNotice = () => {
  const { addMessage } = useContext(ToastContext);
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    (notice: NoticeRequest) => createNotice(notice),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => queryKey[0] === QUERY_KEY.NOTICE,
        });
      },
      onError: error => {
        const errorMessage =
          error instanceof Error ? error.message : '공지 사항 생성을 실패했습니다';

        addMessage(errorMessage);
      },
    }
  );

  return { mutate, isLoading, isSuccess, isError, error };
};
