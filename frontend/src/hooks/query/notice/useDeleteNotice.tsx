import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNotice } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    (noticeId: number) => deleteNotice(noticeId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.NOTICE]);
      },
      onError: error => {
        window.console.log('공지 사항 삭제에 실패했습니다');
      },
    }
  );

  return { mutate, isLoading, isSuccess, isError, error };
};
