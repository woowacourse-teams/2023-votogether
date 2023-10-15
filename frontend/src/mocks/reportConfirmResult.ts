import { rest } from 'msw';

import { MOCK_REPORT_CONFIRM_RESULT } from './mockData/reportConfirmResult';

export const mockReportConfirmResult = [
  rest.get('/alarms/report/:reportId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(MOCK_REPORT_CONFIRM_RESULT));
  }),
];
