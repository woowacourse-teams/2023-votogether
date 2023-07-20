import { example } from './example/get';
import { createEditPostTest } from './jero/post';
import { getVoteDetailTest } from './sua/getVoteDetail';
import { votePostTest } from './sua/vote';
import { mockCategoryHandlers } from './wus/categoryList';

export const handlers = [
  ...example,
  ...votePostTest,
  ...getVoteDetailTest,
  ...createEditPostTest,
  ...mockCategoryHandlers,
];
