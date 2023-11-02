import { rest } from 'msw';

import { MOCKING_DELAY } from './handlers';
import { MOCK_TOKEN } from './mockData/token';

export const mockToken = [
  rest.post('/auth/silent-login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_TOKEN), ctx.delay(MOCKING_DELAY));
  }),
];
