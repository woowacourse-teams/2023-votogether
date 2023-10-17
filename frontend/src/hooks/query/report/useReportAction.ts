import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ReportActionRequest } from '@type/report';

import { reportAction } from '@api/report';

import { QUERY_KEY } from '@constants/queryKey';

export const useReportAction = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async (reportActionData: ReportActionRequest) =>
      await reportAction(reportActionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REPORT] });
    },
    onError: () => {
      window.console.error('신고 조치를 실패했습니다.');
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};
