import { useMutation, useQueryClient } from '@tanstack/react-query';

import { withdrawalMembership } from '@api/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useWithdrawalMembership = () => {
  const queryClient = useQueryClient();

  const LOGGED_IN = true;
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async () => await withdrawalMembership(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_INFO, LOGGED_IN] });
    },
    onError: () => {
      window.console.error('회원 탈퇴에 실패했습니다.');
      alert('회원 탈퇴에 실패했습니다.');
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};
