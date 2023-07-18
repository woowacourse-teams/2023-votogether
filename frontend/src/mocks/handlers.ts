import { example } from './example/get';
import { createEditPostTest } from './jero/post';
import { votePostTest } from './sua/vote';

export const handlers = [...example, ...votePostTest, ...createEditPostTest];
