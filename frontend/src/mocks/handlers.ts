import { example } from './example/get';

import { mockVoteResult } from './getVoteDetail';
import { mockPost } from './post';
import { mockVote } from './vote';

export const handlers = [...example, ...mockPost, ...mockVoteResult, ...mockVote];
