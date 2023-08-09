import { useQuery } from '@tanstack/react-query';

import { User } from '@type/user';

import { getUserInfo } from '@api/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useUserInfo = (isLogged: boolean) => {
  const { data, error, isLoading, isError } = useQuery<User | null>(
    [QUERY_KEY.USER_INFO, isLogged],
    () => getUserInfo(isLogged)
  );

  return { data, error, isLoading, isError };
};
