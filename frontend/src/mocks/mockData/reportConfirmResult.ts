import { ReportConfirmResult } from '@api/alarm';

export const MOCK_REPORT_CONFIRM_RESULT: ReportConfirmResult = {
  id: 1,
  type: 'POST',
  reason: ['BEHAVIOR', 'SPECIFIC_PERSON', 'PRIVACY', 'SPAMMING', 'BEHAVIOR'],
  content: '10004',
  createAt: '2023-12-21 09:11',
};
