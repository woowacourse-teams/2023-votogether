import { mockCategoryHandlers } from './categoryList';
import { mockComment } from './comment';
import { example } from './example/get';
import { mockVoteResult } from './getVoteDetail';
import { mockPost } from './post';
import { mockPostList } from './postList';
import { mockReport } from './report';
import { mockToken } from './token';
import { mockUserInfo } from './userInfo';
import { mockVote } from './vote';

export const handlers = [
  ...example,
  ...mockPostList,
  ...mockPost,
  ...mockVoteResult,
  ...mockVote,
  ...mockCategoryHandlers,
  ...mockUserInfo,
  ...mockComment,
  ...mockReport,
  ...mockToken,
];
