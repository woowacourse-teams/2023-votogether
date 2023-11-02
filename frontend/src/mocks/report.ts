import { rest } from 'msw';

import { MOCKING_DELAY } from './handlers';
import { MOCK_PENDING_REPORT_LIST } from './mockData/report';

export const mockReport = [
  rest.post('/report', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(MOCKING_DELAY));
  }),
  rest.get('/reports/admin', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(MOCKING_DELAY), ctx.json(MOCK_PENDING_REPORT_LIST));
  }),
  rest.post('/reports/action/admin', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(MOCKING_DELAY));
  }),
];
