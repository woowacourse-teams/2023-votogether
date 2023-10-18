import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { withdrawalMembership } from '@api/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useWithdrawalMembership = () => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const LOGGED_IN = true;
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async () => await withdrawalMembership(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_INFO, LOGGED_IN] });
      addMessage('회원 탈퇴를 완료했습니다.');
    },
    onError: () => {
      const message = error instanceof Error ? error.message : '회원 탈퇴를 실패했습니다.';
      addMessage(message);
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};
