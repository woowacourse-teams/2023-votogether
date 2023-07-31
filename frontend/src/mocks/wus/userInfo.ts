import { rest } from 'msw';

import { MOCK_USER_INFO } from '@mocks/mockData/user';

export const mockUserInfo = [
  rest.get('/members/me', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_USER_INFO));
  }),

  rest.patch('/members/me/nickname', (req, res, ctx) => {
    MOCK_USER_INFO.nickname = 'wood';

    return res(ctx.status(200), ctx.json({ ok: true }));
  }),

  rest.delete('/members/me/delete', (req, res, ctx) => {
    MOCK_USER_INFO.nickname = 'cancel';

    return res(ctx.status(204));
  }),
];
