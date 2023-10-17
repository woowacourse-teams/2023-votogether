import { NoticeListResponse } from '@api/notice';

import { StringDate } from './time';

export interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: StringDate;
  deadline: StringDate;
  bannerTitle: string;
  bannerSubtitle: string;
}

export type NoticeList = Omit<NoticeListResponse, 'notices'> & { noticeList: Notice[] };
