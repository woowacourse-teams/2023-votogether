import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { NoticeListType } from '@type/notice';

import { getNoticeList } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const usePagedNoticeList = (initialPageNumber: number = 0) => {
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const { data, isError, isLoading, error } = useQuery<NoticeListType>(
    [QUERY_KEY.NOTICE, pageNumber],
    () => getNoticeList(pageNumber),
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

  const setPage = (value: number) => {
    setPageNumber(value - 1);
  };

  const hasNextPage = data && pageNumber < data.totalPageNumber;

  const fetchPrevPage = () => {
    if (pageNumber === 0) return;

    setPageNumber(prev => prev - 1);
  };

  const fetchNextPage = () => {
    if (!hasNextPage) return;

    setPageNumber(prev => prev + 1);
  };

  return {
    data,
    isError,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    fetchPrevPage,
    page: pageNumber,
    setPage,
  };
};
