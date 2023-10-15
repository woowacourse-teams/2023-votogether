import { useMutation, useQueryClient } from '@tanstack/react-query';

import { readAlarm } from '@api/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

type AlarmType = 'CONTENT' | 'REPORT';

export const useReadLatestAlarm = (alarmId: number, type: AlarmType) => {
  const queryClient = useQueryClient();
  const alarmQueryKey = type === 'CONTENT' ? QUERY_KEY.ALARM_CONTENT : QUERY_KEY.ALARM_REPORT;

  const { mutate } = useMutation({
    mutationFn: async () => await readAlarm(alarmId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [alarmQueryKey] });
    },
    onError: () => {
      //추후 토스트 처리
    },
  });

  return { mutate };
};
