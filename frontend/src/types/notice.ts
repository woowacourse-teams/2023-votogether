import { NoticeListResponse, NoticeResponse } from '@api/notice';

import { StringDateOnly } from './time';

export type Notice = Omit<NoticeResponse, 'createdAt'> & { createdAt: StringDateOnly };

export type NoticeList = Omit<NoticeListResponse, 'notices'> & { noticeList: Notice[] };
