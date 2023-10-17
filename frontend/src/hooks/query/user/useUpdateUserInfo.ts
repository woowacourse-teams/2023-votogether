import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { UpdateUserInfoRequest, updateUserInfo } from '@api/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const LOGGED_IN = true;
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async (userInfo: UpdateUserInfoRequest) => await updateUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_INFO, LOGGED_IN] });

      addMessage('개인정보 등록을 성공했습니다.');
    },
    onError: () => {
      const message = error instanceof Error ? error.message : '개인정보 등록을 실패했습니다.';
      addMessage(message);
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};
