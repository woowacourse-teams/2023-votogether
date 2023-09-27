import { useQuery } from '@tanstack/react-query';

import { PopularPostRanking } from '@type/ranking';

import { getPopularPostRanking } from '@api/ranking';

import { QUERY_KEY } from '@constants/queryKey';

export const usePopularPostRanking = () => {
  const { data, error, isLoading, isError } = useQuery<PopularPostRanking[]>(
    [QUERY_KEY.POPULAR_RANKING],
    getPopularPostRanking,
    {
      suspense: true,
    }
  );

  return { data, error, isLoading, isError };
};
