import { mockComment } from './comment';
import { example } from './example/get';
import { mockVoteResult } from './getVoteDetail';
import { mockPost } from './post';
import { mockVote } from './vote';
import { mockCategoryHandlers } from './wus/categoryList';
import { mockPostList } from './wus/post';
import { mockUserInfo } from './wus/userInfo';

export const handlers = [
  ...example,
  ...mockPostList,
  ...mockPost,
  ...mockVoteResult,
  ...mockVote,
  ...mockCategoryHandlers,
  ...mockUserInfo,
  ...mockComment,
];
