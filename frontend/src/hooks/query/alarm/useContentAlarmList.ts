import { useInfiniteQuery } from '@tanstack/react-query';

import { ContentAlarmList, getContentAlarmList } from '@api/alarm';

import { ALARM_AMOUNT_PER_PAGE } from '@constants/api';
import { QUERY_KEY } from '@constants/queryKey';

export const useContentAlarmList = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ContentAlarmList>(
      [QUERY_KEY.ALARM_CONTENT],
      ({ pageParam = 0 }) => getContentAlarmList(pageParam),
      {
        getNextPageParam: lastPage => {
          if (lastPage.alarmList.length !== ALARM_AMOUNT_PER_PAGE) return;

          return lastPage.pageNumber + 1;
        },
        suspense: true,
      }
    );

  const isListEmpty = data?.pages[0].alarmList.length === 0;

  return { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isListEmpty };
};
