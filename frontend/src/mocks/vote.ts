import { rest } from 'msw';

import { MOCK_POST_INFO } from './mockData/post';

export const mockVote = [
  //투표
  rest.post('/posts/:postId/options/:optionId', (req, res, ctx) => {
    MOCK_POST_INFO.voteInfo.selectedOptionId = 999;

    return res(ctx.status(200), ctx.json({ message: 'ok' }));
  }),

  //선택지 수정
  rest.patch('/posts/:postId/options', (req, res, ctx) => {
    MOCK_POST_INFO.voteInfo.selectedOptionId = 888;

    return res(ctx.status(200), ctx.json({ message: 'ok' }));
  }),
];
