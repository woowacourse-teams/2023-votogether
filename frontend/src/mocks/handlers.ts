import { example } from './example/get';
import { mockVoteResult } from './getVoteDetail';
import { mockPost } from './post';
import { mockVote } from './vote';
import { mockPostList } from './wus/post';
import { mockUserInfo } from './wus/userInfo';

export const handlers = [
  ...example,
  ...mockPost,
  ...mockVoteResult,
  ...mockVote,
  ...mockPostList,
  ...mockUserInfo,
];
