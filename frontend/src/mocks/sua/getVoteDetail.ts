import { rest } from 'msw';

import voteDetail from '../mockData/voteDetail.json';

export const getVoteDetailTest = [
  //투표
  rest.get(`/posts/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(5000), ctx.json(voteDetail));
  }),
];
