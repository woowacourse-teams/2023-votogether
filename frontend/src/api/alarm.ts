import { ReportMessage, ReportType } from '@type/report';
import { StringDate } from '@type/time';

import { getFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_MOCKING_URL;

export interface ContentAlarmList {
  pageNumber: number;
  alarmList: ContentAlarm[];
}

interface ContentAlarm {
  id: number;
  createAt: StringDate;
  isRead: boolean;
  info: {
    id: number; //post
    title: string; //post
    nickname: string; //댓글 작성자
  };
}

export interface ReportAlarmList {
  pageNumber: number;
  alarmList: ReportAlarm[];
}

interface ReportAlarm {
  id: number;
  isRead: boolean;
  info: {
    id: number;
    type: ReportType;
    reason: ReportMessage[];
    content: string;
    createAt: StringDate;
  };
}

export const getContentAlarmList = async (page: number): Promise<ContentAlarmList> => {
  const alarmList = await getFetch<ContentAlarm[]>(`${BASE_URL}/alarms/content?page=${page}`);

  return {
    pageNumber: page,
    alarmList,
  };
};

export const getReportAlarmList = async (page: number): Promise<ReportAlarmList> => {
  const alarmList = await getFetch<ReportAlarm[]>(`${BASE_URL}/alarms/report?page=${page}`);

  return {
    pageNumber: page,
    alarmList,
  };
};
