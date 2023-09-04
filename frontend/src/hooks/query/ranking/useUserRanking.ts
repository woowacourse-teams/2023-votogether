import { useQuery } from '@tanstack/react-query';

import { PassionUser } from '@type/ranking';

import { getUserRanking } from '@api/ranking';

import { QUERY_KEY } from '@constants/queryKey';

export const usePassionUserRanking = (isLoggedIn: boolean) => {
  const { data, error, isLoading, isError } = useQuery<PassionUser | null>(
    [QUERY_KEY.USER_INFO, isLoggedIn, QUERY_KEY.PASSION_RANKING],
    () => getUserRanking(isLoggedIn),
    {
      suspense: true,
    }
  );

  return { data, error, isLoading, isError };
};
