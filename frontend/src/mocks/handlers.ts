import { example } from './example/get';
import { getPostTest } from './sua/post';
import { votePostTest } from './sua/vote';

export const handlers = [...example, ...votePostTest, ...getPostTest];
