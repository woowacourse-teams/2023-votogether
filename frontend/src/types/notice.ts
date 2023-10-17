import { NoticeListResponse } from '@api/notice';

export interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  deadline: string;
  bannerTitle: string;
  bannerSubtitle: string;
}

export type NoticeList = Omit<NoticeListResponse, 'notices'> & { noticeList: Notice[] };
