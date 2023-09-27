import { REPORT_MESSAGE } from '@constants/policyMessage';

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
