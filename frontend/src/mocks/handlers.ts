import { example } from './example/get';
import { votePostTest } from './sua/vote';
import { postListHandlers } from './wus/post';

export const handlers = [...example, ...votePostTest, ...postListHandlers];
