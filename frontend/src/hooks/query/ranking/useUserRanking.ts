import { useQuery } from '@tanstack/react-query';

import { PassionUserRanking } from '@type/ranking';

import { getUserRanking } from '@api/ranking';

import { QUERY_KEY } from '@constants/queryKey';

export const useUserRanking = (isLoggedIn: boolean) => {
  const { data, error, isLoading, isError } = useQuery<PassionUserRanking | null>(
    [QUERY_KEY.USER_INFO, isLoggedIn, QUERY_KEY.PASSION_RANKING],
    () => getUserRanking(isLoggedIn),
    {
      suspense: true,
    }
  );

  return { data, error, isLoading, isError };
};
