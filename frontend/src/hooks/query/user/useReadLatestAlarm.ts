import { useMutation, useQueryClient } from '@tanstack/react-query';

import { readLatestAlarm } from '@api/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useReadLatestAlarm = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => await readLatestAlarm(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_INFO] });
    },
  });

  return { mutate };
};
