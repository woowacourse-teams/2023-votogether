import { rest } from 'msw';

import { MOCK_REPORT_APPROVE_RESULT } from './mockData/reportApproveResult';

export const mockReportApproveResult = [
  rest.get('/alarms/report/:reportId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(MOCK_REPORT_APPROVE_RESULT));
  }),
];
