import {
  PendingReportActionList,
  PendingReportActionListResponse,
  ReportActionRequest,
  ReportRequest,
} from '@type/report';

import { REPORT_TYPE } from '@constants/report';

import { getFetch, postFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_MOCKING_URL;

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
    const { type, ...rest } = report;
    return { ...rest, typeName: REPORT_TYPE[report.type] };
  });

  return { ...rest, reportList };
};

export const reportAction = async (reportActionData: ReportActionRequest) => {
  return await postFetch(`${BASE_URL}/reports/action/admin`, reportActionData);
};
