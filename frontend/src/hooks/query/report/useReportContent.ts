import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ReportRequest } from '@type/report';

import { ToastContext } from '@hooks/context/toast';

import { reportContent } from '@api/report';

import { QUERY_KEY } from '@constants/queryKey';

export const useReportContent = () => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (reportData: ReportRequest) => await reportContent(reportData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REPORT] });
      addMessage('신고를 완료하였습니다.');
    },
    onError: error => {
      const message = error instanceof Error ? error.message : '개인정보 등록을 실패했습니다.';
      addMessage(message);
    },
  });

  return { mutate, isLoading };
};
