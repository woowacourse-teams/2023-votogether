import { useQuery } from '@tanstack/react-query';

import { getPopularPostRanking } from '@api/ranking';

import { QUERY_KEY } from '@constants/queryKey';

export const usePopularPostRanking = () => {
  const { data, error, isLoading, isError } = useQuery(
    [QUERY_KEY.POPULAR_RANKING],
    getPopularPostRanking,
    {
      suspense: true,
    }
  );

  return { data, error, isLoading, isError };
};
