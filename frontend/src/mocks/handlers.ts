import { example } from './example/get';
import { mockVoteResult } from './getVoteDetail';
import { mockPost } from './post';
import { mockVote } from './vote';
import { mockUserInfo } from './wus/userInfo';
import { postListHandlers } from './wus/post';

export const handlers = [
  ...example,
  ...mockPost,
  ...mockVoteResult,
  ...mockVote,
  ...postListHandlers,
  ...mockUserInfo,
];
