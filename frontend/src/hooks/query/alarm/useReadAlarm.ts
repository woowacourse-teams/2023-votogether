import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AlarmType } from '@type/alarm';

import { readAlarm } from '@api/alarm';

import { QUERY_KEY } from '@constants/queryKey';

export const useReadAlarm = (type: AlarmType) => {
  const queryClient = useQueryClient();
  const alarmQueryKey = type === 'CONTENT' ? QUERY_KEY.ALARM_CONTENT : QUERY_KEY.ALARM_REPORT;

  const { mutate } = useMutation({
    mutationFn: async (alarmId: number) => await readAlarm(alarmId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [alarmQueryKey] });
    },
  });

  return { mutate };
};
