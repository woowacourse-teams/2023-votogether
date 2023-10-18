import { useQuery } from '@tanstack/react-query';

import { ReportApproveResult, getReportApproveResult } from '@api/alarm';

import { QUERY_KEY } from '@constants/queryKey';

export const useReportApproveResult = (reportId: number) => {
  const { data } = useQuery<ReportApproveResult>(
    [QUERY_KEY.REPORT_APPROVE_RESULT, reportId],
    () => getReportApproveResult(reportId),
    {
      cacheTime: 60 * 60 * 1000,
      staleTime: 60 * 60 * 1000,
      suspense: true,

      retry: (failCount, error) => {
        // const fetchError = error as Error;
        // const status = JSON.parse(fetchError.message).status;
        // if (status === 404) {
        //   return false;
        // }
        return failCount <= 3;
      },
    }
  );

  return { data };
};
