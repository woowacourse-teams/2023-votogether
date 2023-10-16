import { ReportMessage, ReportType } from '@type/report';
import { StringDate } from '@type/time';

import { getFetch, patchFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_MOCKING_URL;

export interface ContentAlarmList {
  pageNumber: number;
  alarmList: ContentAlarm[];
}

interface ContentAlarm {
  alarmId: number;
  createdAt: StringDate;
  isChecked: boolean;
  detail: {
    postId: number;
    postTitle: string;
    commentWriter: string; // 게시글에 관한 알림일때는 ""으로 옴
  };
}

export const getContentAlarmList = async (page: number): Promise<ContentAlarmList> => {
  const alarmList = await getFetch<ContentAlarm[]>(`${BASE_URL}/alarms/content?page=${page}`);

  return {
    pageNumber: page,
    alarmList,
  };
};

export interface ReportAlarmList {
  pageNumber: number;
  alarmList: ReportAlarm[];
}

interface ReportAlarm {
  alarmId: number;
  isChecked: boolean;
  detail: ReportConfirmResult;
}

interface ReportAlarmResponse {
  alarmId: number;
  isChecked: boolean;
  detail: ReportConfirmResultResponse;
}

export interface ReportConfirmResult {
  reportId: number;
  type: ReportType;
  reasonList: ReportMessage[];
  content: string;
  createdAt: StringDate;
}

export interface ReportConfirmResultResponse {
  reportId: number;
  type: ReportType;
  reasons: ReportMessage[];
  content: string;
  createdAt: StringDate;
}

const transformReportConfirmResultResponse = (reportConfirmResult: ReportConfirmResultResponse) => {
  const { reportId, type, reasons, content, createdAt } = reportConfirmResult;
  return { reportId, type, reasonList: reasons, content, createdAt };
};

export const getReportAlarmList = async (page: number): Promise<ReportAlarmList> => {
  const alarmList = await getFetch<ReportAlarmResponse[]>(`${BASE_URL}/alarms/report?page=${page}`);

  return {
    pageNumber: page,
    alarmList: alarmList.map(alarm => ({
      ...alarm,
      detail: transformReportConfirmResultResponse(alarm.detail),
    })),
  };
};

export const getReportConfirmResult = async (reportId: number): Promise<ReportConfirmResult> => {
  const reportConfirmResult = await getFetch<ReportConfirmResultResponse>(
    `${BASE_URL}/alarms/report/${reportId}`
  );

  return transformReportConfirmResultResponse(reportConfirmResult);
};

export const readAlarm = async (alarmId: number) => {
  await patchFetch(`${BASE_URL}/alarms/${alarmId}`);
};
