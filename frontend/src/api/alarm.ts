import { AlarmType } from '@type/alarm';
import { ReportMessage, ReportType } from '@type/report';
import { StringDate } from '@type/time';

import { getFetch, patchFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

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
  detail: ReportApproveResult;
}

interface ReportAlarmResponse {
  alarmId: number;
  isChecked: boolean;
  detail: ReportApproveResultResponse;
}

export interface ReportApproveResult {
  reportId: number;
  type: ReportType;
  reasonList: ReportMessage[];
  content: string;
  createdAt: StringDate;
}

export interface ReportApproveResultResponse {
  reportActionId: number;
  type: ReportType;
  reasons: ReportMessage[];
  content: string;
  createdAt: StringDate;
}

const transformReportApproveResultResponse = (reportApproveResult: ReportApproveResultResponse) => {
  const { reportActionId: reportId, type, reasons, content, createdAt } = reportApproveResult;
  return { reportId, type, reasonList: reasons, content, createdAt };
};

export const getReportAlarmList = async (page: number): Promise<ReportAlarmList> => {
  const alarmList = await getFetch<ReportAlarmResponse[]>(`${BASE_URL}/alarms/report?page=${page}`);

  return {
    pageNumber: page,
    alarmList: alarmList.map(alarm => ({
      ...alarm,
      detail: transformReportApproveResultResponse(alarm.detail),
    })),
  };
};

export const getReportApproveResult = async (reportId: number): Promise<ReportApproveResult> => {
  const reportApproveResult = await getFetch<ReportApproveResultResponse>(
    `${BASE_URL}/alarms/report/${reportId}`
  );

  return transformReportApproveResultResponse(reportApproveResult);
};

export const readAlarm = async (alarmId: number, type: AlarmType) => {
  await patchFetch(`${BASE_URL}/alarms/${alarmId}?type=${type}`);
};
