import { useMutation, useQueryClient } from '@tanstack/react-query';

import { modifyNickname } from '@api/wus/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useModifyUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (nickname: string) => modifyNickname(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_INFO] });
    },
    onError: () => {
      window.console.error('닉네임 변경에 실패했습니다.');
    },
  });

  return { mutate, isLoading };
};
