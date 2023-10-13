import { useQuery } from '@tanstack/react-query';

import { PendingReportActionList } from '@type/report';

import { getPendingReportActionList } from '@api/report';

import { QUERY_KEY } from '@constants/queryKey';

export const usePendingReportActionList = (page: number) => {
  const { data, error, isLoading, isError } = useQuery<PendingReportActionList>(
    [QUERY_KEY.REPORT],
    () => getPendingReportActionList(page),
    {
      suspense: true,
    }
  );

  return { data, error, isLoading, isError };
};
