import { useQuery } from '@tanstack/react-query';

import { Notice } from '@type/notice';

import { getNoticeDetail } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const useNoticeDetail = (noticeId: number) => {
  const { data, isError, isLoading, error } = useQuery<Notice>(
    [QUERY_KEY.NOTICE, noticeId],
    () => getNoticeDetail(noticeId),
    {
      suspense: true,
      cacheTime: 60 * 60 * 1000,
      staleTime: 60 * 60 * 1000,
      onSuccess: data => {
        return data;
      },
      onError: () => {
        console.error('공지 사항의 상세 정보를 불러오는데 실패했습니다');
      },
    }
  );

  return { data, isError, isLoading, error };
};
