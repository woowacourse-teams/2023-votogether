import { PendingReportActionListResponse, PendingReportActionResponse } from '@api/report';

import { REPORT_MESSAGE } from '@constants/policyMessage';
import { REPORT_TYPE } from '@constants/report';

export type ReportType = 'POST' | 'COMMENT' | 'NICKNAME';

export type ReportMessage = keyof typeof REPORT_MESSAGE;

export interface ReportRequest {
  type: ReportType;
  id: number;
  reason: ReportMessage;
}

/**
 * 신고용 모달에 사용하기 위한 타입
 */
export interface ReportInfo {
  name: string;
  reportMessageList: Record<ReportMessage, string>;
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
