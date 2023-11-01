import { PendingReportActionList, ReportActionRequest, ReportRequest } from '@type/report';
import { StringDate } from '@type/time';

import { REPORT_MESSAGE } from '@constants/policyMessage';
import { REPORT_TYPE } from '@constants/report';

import { getFetch, postFetch } from '@utils/fetch';

export interface PendingReportActionResponse {
  id: number;
  type: keyof typeof REPORT_TYPE;
  reasons: (keyof typeof REPORT_MESSAGE)[];
  createdAt: StringDate;
  target: string;
}

export interface PendingReportActionListResponse {
  totalPageNumber: number;
  currentPageNumber: number;
  reports: PendingReportActionResponse[];
}

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const reportContent = async (reportData: ReportRequest) => {
  return await postFetch(`${BASE_URL}/report`, reportData);
};

export const getPendingReportActionList = async (
  page: number
): Promise<PendingReportActionList> => {
  const pendingReportActionList = await getFetch<PendingReportActionListResponse>(
    `${BASE_URL}/reports/admin?page=${page}`
  );
  const { reports, ...rest } = pendingReportActionList;
  const reportList = reports.map(report => {
    const { type, reasons, ...rest } = report;
    const transformedReasonList = reasons.map(reason => REPORT_MESSAGE[reason]);
    return {
      ...rest,
      typeName: REPORT_TYPE[report.type],
      reason: transformedReasonList.join(', '),
    };
  });

  return { ...rest, reportList };
};

export const reportAction = async (reportActionData: ReportActionRequest) => {
  return await postFetch(`${BASE_URL}/reports/action/admin`, reportActionData);
};
