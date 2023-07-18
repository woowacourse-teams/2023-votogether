import { rest } from 'msw';

import { mockVoteResult } from '@components/VoteStatistics/mockData';

import voteDetail from '../mockData/voteDetail.json';

export const getVoteDetailTest = [
  rest.get(`/posts/:postId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(voteDetail));
  }),

  rest.get(`/posts/:postId/options`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(mockVoteResult));
  }),

  rest.get(`/posts/:postId/options/:optionId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(mockVoteResult));
  }),
];
