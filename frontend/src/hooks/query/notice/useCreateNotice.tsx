import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NoticeRequest } from '@type/notice';

import { createNotice } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const useCreateNotice = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    (notice: NoticeRequest) => createNotice(notice),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.NOTICE]);
      },
      onError: error => {
        window.console.log('공지 사항 생성에 실패했습니다');
      },
    }
  );

  return { mutate, isLoading, isSuccess, isError, error };
};
