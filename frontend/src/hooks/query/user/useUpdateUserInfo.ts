import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateUserInfoRequest, updateUserInfo } from '@api/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  const LOGGED_IN = true;
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async (userInfo: UpdateUserInfoRequest) => await updateUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_INFO, LOGGED_IN] });
    },
    onError: () => {
      window.console.error('개인 정보 등록에 실패했습니다.');
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};
