import { REPORT_MESSAGE } from '@constants/policyMessage';
import { REPORT_TYPE } from '@constants/report';

import { StringDate } from './time';

export type ReportType = 'POST' | 'COMMENT' | 'NICKNAME';

export interface ReportRequest {
  type: ReportType;
  id: number;
  reason: string;
}

export type ReportMessage = keyof typeof REPORT_MESSAGE;

/**
 * 신고용 모달에 사용하기 위한 타입
 */
export interface ReportInfo {
  name: string;
  reportMessageList: { [key: string]: string };
}

export interface PendingReportActionListResponse {
  totalPageNumber: number;
  currentPageNumber: number;
  reports: PendingReportActionResponse[];
}
export interface PendingReportActionResponse {
  id: number;
  type: keyof typeof REPORT_TYPE;
  reasons: string[];
  createdAt: StringDate;
  target: string;
}

export type PendingReportAction = Omit<PendingReportActionResponse, 'type' | 'reasons'> & {
  typeName: (typeof REPORT_TYPE)[keyof typeof REPORT_TYPE];
  reason: string;
};

export type PendingReportActionList = Omit<PendingReportActionListResponse, 'reports'> & {
  reportList: PendingReportAction[];
};

export interface ReportActionRequest {
  id: number;
  hasAction: boolean;
}
