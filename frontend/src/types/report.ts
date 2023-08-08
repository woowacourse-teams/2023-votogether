import { REPORT_MESSAGE } from '@components/ReportModal/constants';

export type ReportType = 'POST' | 'COMMENT' | 'NICKNAME';

export interface ReportRequest {
  type: ReportType;
  id: number;
  reason: string;
}

export type ReportMessage = keyof typeof REPORT_MESSAGE;
export type ReportMessageList = { [key: string]: string };

export interface ReportInfo {
  name: string;
  reportMessageList: ReportMessageList;
}
