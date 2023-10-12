import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNotice } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const useNoticeDelete = (noticeId: number) => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError, error, isLoading } = useMutation({
    mutationFn: () => deleteNotice(noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.NOTICE]);
    },
    onError: error => {
      window.console.log('게시물 삭제에 실패했습니다.', error);
    },
  });

  return { mutate, isSuccess, isError, error, isLoading };
};
