import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { PendingReportActionList } from '@type/report';

import { ToastContext } from '@hooks/context/toast';
import { usePagination } from '@hooks/usePagination';

import { getPendingReportActionList } from '@api/report';

import { QUERY_KEY } from '@constants/queryKey';

export const usePendingReportActionList = (initialPageNumber: number = 0) => {
  const { addMessage } = useContext(ToastContext);

  const PAGE_SIZE = 20;

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

  const { data, isLoading, isError, error } = useQuery<PendingReportActionList>(
    [QUERY_KEY.REPORT, page],
    () => getPendingReportActionList(page),
    {
      suspense: true,
      onSuccess: data => {
        return data;
      },
      onError: error => {
        const message =
          error instanceof Error ? error.message : '신고 조치 예정 목록 조회를 실패했습니다.';
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
