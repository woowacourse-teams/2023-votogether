import { rest } from 'msw';

import { MOCK_USER_INFO } from '@mocks/mockData/user';

export const mockUserInfo = [
  rest.get('/members/me', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_USER_INFO));
  }),
];
