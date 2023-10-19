import { useInfiniteQuery } from '@tanstack/react-query';

import { NoticeListType } from '@type/notice';

import { getNoticeList } from '@api/notice';

import { QUERY_KEY } from '@constants/queryKey';

export const useStackedNoticeList = () => {
  const { data, isError, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<NoticeListType>(
      [QUERY_KEY.NOTICE],
      ({ pageParam = 0 }) => getNoticeList(pageParam),
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
        getNextPageParam: lastPage => {
          if (lastPage.currentPageNumber + 1 === lastPage.totalPageNumber) return;

          return lastPage.currentPageNumber + 1;
        },
      }
    );

  return { data, isError, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage };
};
