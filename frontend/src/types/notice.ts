import { StringDate, StringDateUpToDay } from './time';

export interface NoticeResponse {
  id: number;
  title: string;
  content: string;
  createdAt: StringDate;
  deadline: StringDate;
  bannerTitle: string;
  bannerSubtitle: string;
}

export interface NoticeListResponse {
  totalPageNumber: number;
  currentPageNumber: number;
  notices: NoticeResponse[];
}

export type NoticeRequest = Omit<Notice, 'createdAt' | 'id'>;

export type Notice = Omit<NoticeResponse, 'createdAt'> & { createdAt: StringDateUpToDay };

export type NoticeListType = Omit<NoticeListResponse, 'notices'> & { noticeList: Notice[] };
