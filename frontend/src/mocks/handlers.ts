import { example } from './example/get';
import { mockVoteResult } from './getVoteDetail';
import { mockPost } from './post';
import { mockVote } from './vote';
import { postListHandlers } from './wus/post';

export const handlers = [
  ...example,
  ...mockPost,
  ...mockVoteResult,
  ...mockVote,
  ...postListHandlers,
];
