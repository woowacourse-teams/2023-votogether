import { Size } from '@type/style';

import { useVoteStatistics } from '@hooks/query/useVoteStatistics';

import VoteStatistics from '@components/VoteStatistics';

export default function StatisticsWrapper({
  size,
  postId,
  optionId,
}: {
  size: Size;
  postId: number;
  optionId?: number;
}) {
  const { data: voteResult } = useVoteStatistics(postId, optionId);

  return voteResult && <VoteStatistics voteResult={voteResult} size={size} />;
}
