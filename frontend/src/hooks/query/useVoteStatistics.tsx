import { useQuery } from '@tanstack/react-query';

import { getOptionStatistics, getPostStatistics } from '@api/voteResult';

import { VoteResult } from '@components/VoteStatistics/type';

import { QUERY_KEY } from '@constants/queryKey';

export const useVoteStatistics = (postId: number, optionId?: number) => {
  const { data } = useQuery<VoteResult>(
    optionId ? [QUERY_KEY.VOTE_STATISTICS, postId, optionId] : [QUERY_KEY.VOTE_STATISTICS, postId],
    () => (optionId ? getOptionStatistics({ postId, optionId }) : getPostStatistics(postId)),
    {
      cacheTime: 60 * 60 * 1000,
      staleTime: 60 * 60 * 1000,
      suspense: true,
    }
  );

  return { data };
};
