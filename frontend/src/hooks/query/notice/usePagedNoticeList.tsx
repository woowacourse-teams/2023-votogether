import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { NoticeListType } from '@type/notice';

import { ToastContext } from '@hooks/context/toast';
import { usePagination } from '@hooks/usePagination';

import { getNoticeList } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const usePagedNoticeList = (initialPageNumber: number = 0) => {
  const { addMessage } = useContext(ToastContext);

  const PAGE_SIZE = 5;

  const {
    fetchNextPage,
    fetchPrevPage,
    checkNextPage,
    page,
    setPage,
    startNumber,
    getPageNumberList,
    hasPrevPage,
  } = usePagination(initialPageNumber, PAGE_SIZE);

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
        const message =
          error instanceof Error ? error.message : '공지사항 리스트 조회를 실패했습니다.';
        addMessage(message);
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
