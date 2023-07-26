import { rest } from 'msw';

export const example = [
  rest.get('/example', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
