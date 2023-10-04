import { useQuery } from '@tanstack/react-query';

import { PassionUserRanking } from '@type/ranking';

import { getPassionUserRanking } from '@api/ranking';

import { QUERY_KEY } from '@constants/queryKey';

export const usePassionUserRanking = () => {
  const { data, error, isLoading, isError } = useQuery<PassionUserRanking[]>(
    [QUERY_KEY.PASSION_RANKING],
    getPassionUserRanking,
    {
      suspense: true,
    }
  );

  return { data, error, isLoading, isError };
};
