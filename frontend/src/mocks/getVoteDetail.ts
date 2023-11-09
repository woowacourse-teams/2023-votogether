import { rest } from 'msw';

import { MOCKING_DELAY } from './handlers';
import { MOCK_POST_INFO } from './mockData/post';
import { MOCK_VOTE_RESULT } from './mockData/voteResult';

export const mockVoteResult = [
  rest.get(`/posts/:postId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(MOCKING_DELAY), ctx.json(MOCK_POST_INFO));
  }),

  rest.get(`/posts/:postId/options`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(MOCKING_DELAY), ctx.json(MOCK_VOTE_RESULT));
  }),

  rest.get(`/posts/:postId/options/:optionId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(MOCKING_DELAY), ctx.json(MOCK_VOTE_RESULT));
  }),
];
