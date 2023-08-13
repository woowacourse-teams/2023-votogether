import { useQuery, useQueryClient } from '@tanstack/react-query';

import { User } from '@type/user';

import { getUserInfo } from '@api/userInfo';

import { QUERY_KEY } from '@constants/queryKey';

export const useUserInfo = (isLoggedIn: boolean) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery<User | null>(
    [QUERY_KEY.USER_INFO, isLoggedIn],
    () => getUserInfo(isLoggedIn),
    {
      cacheTime: 60 * 60 * 1000,
      staleTime: 60 * 60 * 1000,
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.USER_INFO]);
      },
      onError: error => {
        window.console.log('User Info Fetch Error', error);
      },
    }
  );

  return { data, error, isLoading, isError };
};
