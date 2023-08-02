import { mockCategoryHandlers } from './categoryList';
import { mockComment } from './comment';
import { example } from './example/get';
import { mockVoteResult } from './getVoteDetail';
import { mockPost } from './post';
import { mockUserInfo } from './userInfo';
import { mockVote } from './vote';
import { mockPostList } from './wus/post';

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
