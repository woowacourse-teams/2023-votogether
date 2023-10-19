import { useQuery } from '@tanstack/react-query';

import { NoticeListType } from '@type/notice';

import { usePagination } from '@hooks/usePagination';

import { getNoticeList } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const usePagedNoticeList = (initialPageNumber: number = 0) => {
  const {
    fetchNextPage,
    fetchPrevPage,
    checkNextPage,
    page,
    setPage,
    startNumber,
    getPageNumberList,
    hasPrevPage,
  } = usePagination(initialPageNumber, 5);

  const { data, isError, isLoading, error } = useQuery<NoticeListType>(
    [QUERY_KEY.NOTICE, page],
    () => getNoticeList(page),
    {
      suspense: true,
      cacheTime: 30 * 60 * 1000,
      staleTime: 30 * 60 * 1000,
      onSuccess: data => {
        return data;
      },
      onError: () => {
        console.error('공지 사항의 리스트를 불러오는데 실패했습니다');
      },
    }
  );

  const hasNextPage = data && checkNextPage(data.totalPageNumber);

  return {
    data,
    isError,
    isLoading,
    error,
    fetchNextPage,
    fetchPrevPage,
    getPageNumberList,
    page,
    setPage,
    startNumber,
    hasPrevPage,
    hasNextPage,
  };
};
