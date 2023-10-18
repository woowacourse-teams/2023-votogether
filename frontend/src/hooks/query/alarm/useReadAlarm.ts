import { useMutation, useQueryClient } from '@tanstack/react-query';

import { readAlarm } from '@api/alarm';

import { QUERY_KEY } from '@constants/queryKey';

type AlarmType = 'CONTENT' | 'REPORT';

export const useReadAlarm = (type: AlarmType) => {
  const queryClient = useQueryClient();
  const alarmQueryKey = type === 'CONTENT' ? QUERY_KEY.ALARM_CONTENT : QUERY_KEY.ALARM_REPORT;

  const { mutate } = useMutation({
    mutationFn: async (alarmId: number) => await readAlarm(alarmId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [alarmQueryKey] });
    },
  });

  return { mutate };
};
