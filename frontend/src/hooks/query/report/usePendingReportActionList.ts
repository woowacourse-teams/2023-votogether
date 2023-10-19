import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { PendingReportActionList } from '@type/report';

import { ToastContext } from '@hooks/context/toast';

import { getPendingReportActionList } from '@api/report';

import { QUERY_KEY } from '@constants/queryKey';

export const usePendingReportActionList = (page: number) => {
  const { addMessage } = useContext(ToastContext);

  const { data } = useQuery<PendingReportActionList>(
    [QUERY_KEY.REPORT],
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

  return { data };
};
