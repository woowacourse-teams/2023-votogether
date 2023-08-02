import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelMembership } from '@api/wus/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useCancelMembership = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => cancelMembership(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_INFO] });
    },
    onError: () => {
      window.console.error('회원 탈퇴에 실패했습니다.');
    },
  });

  return { mutate, isLoading };
};
