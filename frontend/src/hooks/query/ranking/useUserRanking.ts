import { useQuery } from '@tanstack/react-query';

import { getUserRanking } from '@api/ranking';

import { QUERY_KEY } from '@constants/queryKey';

export const usePassionUserRanking = (isLoggedIn: boolean) => {
  // 명세가 정해지면 아래 각주 타입으로 지정할 예정
  // const { data, error, isLoading, isError } = useQuery<UserRanking | null>(
  const { data, error, isLoading, isError } = useQuery(
    [QUERY_KEY.USER_INFO, isLoggedIn, QUERY_KEY.PASSION_RANKING],
    () => getUserRanking(isLoggedIn),
    {
      suspense: true,
    }
  );

  return { data, error, isLoading, isError };
};
