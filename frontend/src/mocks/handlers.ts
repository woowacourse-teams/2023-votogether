import { example } from './example/get';
import { createEditPostTest } from './jero/post';
import { votePostTest } from './sua/vote';
import { getVoteDetailTest } from './sua/getVoteDetail';

export const handlers = [...example, ...votePostTest, ...getVoteDetailTest, ...createEditPostTest];
