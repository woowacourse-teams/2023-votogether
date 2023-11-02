import { rest } from 'msw';

import { MOCKING_DELAY } from './handlers';
import { MOCK_CONTENT_ALARM_LIST, MOCK_REPORT_ALARM_LIST } from './mockData/alarm';

export const mockAlarm = [
  rest.get(`/alarms/content`, (req, res, ctx) => {
    return res(ctx.delay(MOCKING_DELAY), ctx.status(200), ctx.json(MOCK_CONTENT_ALARM_LIST()));
  }),

  rest.get(`/alarms/report`, (req, res, ctx) => {
    return res(ctx.delay(MOCKING_DELAY), ctx.status(200), ctx.json(MOCK_REPORT_ALARM_LIST()));
  }),
];
