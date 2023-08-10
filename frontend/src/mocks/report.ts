import { rest } from 'msw';

export const mockReport = [
  rest.post('/report', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
