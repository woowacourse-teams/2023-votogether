import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { modifyNickname } from '@api/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useModifyUser = () => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const { mutate } = useMutation({
    mutationFn: (nickname: string) => modifyNickname(nickname),
    onMutate: async newNickname => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.USER_INFO] });
      const previousNickname = queryClient.getQueryData([QUERY_KEY.USER_INFO]);
      queryClient.setQueryData([QUERY_KEY.USER_INFO], newNickname);

      return { previousNickname, newNickname };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([QUERY_KEY.USER_INFO], context?.previousNickname);

      const message = error instanceof Error ? error.message : '닉네임 변경을 실패했습니다.';
      addMessage(message);
    },
    onSuccess: () => {
      addMessage('닉네임 변경을 완료했습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_INFO] });
    },
  });

  return { mutate };
};
