import { ReportConfirmResultResponse } from '@api/alarm';

export const MOCK_REPORT_CONFIRM_RESULT: ReportConfirmResultResponse = {
  reportId: 1,
  type: 'POST',
  reasons: ['BEHAVIOR', 'SPECIFIC_PERSON', 'PRIVACY', 'SPAMMING', 'BEHAVIOR'],
  content: '10004',
  createdAt: '2023-12-21 09:11',
};
