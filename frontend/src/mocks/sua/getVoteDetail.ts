import { rest } from 'msw';

import { mockVoteResult } from '@components/VoteStatistics/mockData';

import voteDetail from '../mockData/voteDetail.json';

export const getVoteDetailTest = [
  //Id가 1인 게시물의 상세정보
  rest.get(`/posts/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(voteDetail));
  }),

  //Id가 1인 게시물의 ID가 2인 선택지의 투표 통계정보
  rest.get(`/posts/1/options/2`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(mockVoteResult));
  }),

  rest.get(`/posts/1/options/12`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(mockVoteResult));
  }),

  rest.get(`/posts/1/options/123`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(mockVoteResult));
  }),

  rest.get(`/posts/1/options/1234`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(mockVoteResult));
  }),

  rest.get(`/posts/1/options`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(mockVoteResult));
  }),
];
