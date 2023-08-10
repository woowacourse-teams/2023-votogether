import { useMutation, useQueryClient } from '@tanstack/react-query';

import { modifyNickname } from '@api/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useModifyUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (nickname: string) => modifyNickname(nickname),
    onMutate: async newNickname => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.USER_INFO] });
      const previousNickname = queryClient.getQueryData([QUERY_KEY.USER_INFO]);
      queryClient.setQueryData([QUERY_KEY.USER_INFO], newNickname);

      return { previousNickname, newNickname };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([QUERY_KEY.USER_INFO], context?.previousNickname);
      window.console.error('닉네임 변경에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_INFO] });
    },
  });

  return { mutate, isLoading };
};
