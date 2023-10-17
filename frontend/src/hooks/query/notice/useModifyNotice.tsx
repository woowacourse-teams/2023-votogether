import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NoticeRequest, modifyNotice } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const useModifyNotice = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    ({ noticeId, notice }: { notice: NoticeRequest; noticeId: number }) =>
      modifyNotice({ notice, noticeId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.NOTICE]);
      },
      onError: error => {
        window.console.log('공지 사항 수정에 실패했습니다');
      },
    }
  );

  return { mutate, isLoading, isSuccess, isError, error };
};