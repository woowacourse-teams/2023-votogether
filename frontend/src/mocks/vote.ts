import { rest } from 'msw';

export const mockVote = [
  //투표
  rest.post(`/posts/:postId/options/:optionId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'ok' }));
  }),

  //선택지 수정
  rest.patch(`/posts/:postId/options`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'ok' }));
  }),
];
