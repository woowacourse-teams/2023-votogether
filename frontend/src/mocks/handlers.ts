import { example } from './example/get';
import { getVoteDetailTest } from './sua/getVoteDetail';
import { votePostTest } from './sua/vote';

export const handlers = [...example, ...votePostTest, ...getVoteDetailTest];
