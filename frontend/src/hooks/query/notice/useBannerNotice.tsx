import { useQuery } from '@tanstack/react-query';

import { Notice } from '@type/notice';

import { getBannerNotice } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const useBannerNotice = () => {
  const { data, isError, isLoading, error } = useQuery<Notice | null>(
    [QUERY_KEY.NOTICE, 'banner'],
    getBannerNotice,
    {
      suspense: true,
      cacheTime: 30 * 60 * 1000,
      staleTime: 30 * 60 * 1000,
      onSuccess: data => {
        return data;
      },
      onError: () => {
        console.error('배너 공지 사항을 불러오는데 실패했습니다');
      },
      retry: false,
    }
  );

  return { data, isError, isLoading, error };
};
