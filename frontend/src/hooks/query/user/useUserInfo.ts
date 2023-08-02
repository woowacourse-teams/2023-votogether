import { useQuery } from '@tanstack/react-query';

import { UserInfoResponse } from '@type/user';

import { getUserInfo } from '@api/wus/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useUserInfo = (isLogged: boolean) => {
  const { data, error, isLoading, isError } = useQuery<UserInfoResponse>(
    [QUERY_KEY.USER_INFO, isLogged],
    getUserInfo
  );

  return { data, error, isLoading, isError };
};
