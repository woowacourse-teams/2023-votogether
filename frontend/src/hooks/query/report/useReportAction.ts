import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ReportActionRequest } from '@type/report';

import { ToastContext } from '@hooks/context/toast';

import { reportAction } from '@api/report';

import { QUERY_KEY } from '@constants/queryKey';

export const useReportAction = () => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async (reportActionData: ReportActionRequest) =>
      await reportAction(reportActionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REPORT] });
    },
    onError: () => {
      const message = error instanceof Error ? error.message : '신고 조치를 실패했습니다.';
      addMessage(message);
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};
