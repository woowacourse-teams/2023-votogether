import { Notice, NoticeList } from '@type/notice';

import { deleteFetch, getFetch, patchFetch, postFetch } from '@utils/fetch';

export const transformNotice = ({
  id,
  title,
  content,
  createdAt,
  deadline,
  bannerTitle,
  bannerSubtitle,
}: NoticeResponse): Notice => {
  return {
    id,
    title,
    content,
    createdAt,
    deadline,
    bannerTitle,
    bannerSubtitle,
  };
};

export interface NoticeResponse {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  deadline: string;
  bannerTitle: string;
  bannerSubtitle: string;
}

export interface NoticeListResponse {
  totalPageNumber: number;
  currentPageNumber: number;
  notices: NoticeResponse[];
}

export type NoticeRequest = Omit<NoticeResponse, 'createdAt' | 'id'>;

const BASE_URL = process.env.VOTOGETHER_BASE_URL ?? '';

export const createNotice = async (notice: NoticeRequest) => {
  await postFetch(`${BASE_URL}/notices`, notice);
};

export const getBannerNotice = async () => {
  const bannerNotice = await getFetch<NoticeResponse>(`${BASE_URL}/notices/progress`);

  return transformNotice(bannerNotice);
};

export const getNoticeList = async (page: number): Promise<NoticeList> => {
  const noticeListInfo = await getFetch<NoticeListResponse>(`${BASE_URL}/notices?page=${page}`);

  return {
    totalPageNumber: noticeListInfo.totalPageNumber,
    currentPageNumber: noticeListInfo.currentPageNumber,
    noticeList: noticeListInfo.notices.map(notice => transformNotice(notice)),
  };
};

export const getNoticeDetail = async (noticeId: number) => {
  const noticeDetail = await getFetch<NoticeResponse>(`${BASE_URL}/notices/${noticeId}`);

  return transformNotice(noticeDetail);
};

export const modifyNotice = async ({
  noticeId,
  notice,
}: {
  noticeId: number;
  notice: NoticeRequest;
}) => {
  return await patchFetch(`${BASE_URL}/notices/${noticeId}`, notice);
};

export const deleteNotice = async (noticeId: number) => {
  return await deleteFetch(`${BASE_URL}/notices/${noticeId}`);
};
