import {
  Notice,
  NoticeListType,
  NoticeListResponse,
  NoticeRequest,
  NoticeResponse,
} from '@type/notice';
import { StringDateUpToDay } from '@type/time';

import { deleteFetch, getFetch, postFetch, putFetch } from '@utils/fetch';

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
    createdAt: createdAt.split(' ')[0] as StringDateUpToDay,
    deadline,
    bannerTitle,
    bannerSubtitle,
  };
};

const BASE_URL = process.env.VOTOGETHER_BASE_URL ?? '';

export const createNotice = async (notice: NoticeRequest) => {
  await postFetch(`${BASE_URL}/notices`, notice);
};

export const getBannerNotice = async () => {
  const bannerNotice = await getFetch<NoticeResponse>(`${BASE_URL}/notices/progress`);

  if (bannerNotice.id === null) return null;

  return transformNotice(bannerNotice);
};

export const getNoticeList = async (page: number): Promise<NoticeListType> => {
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
  return await putFetch(`${BASE_URL}/notices/${noticeId}`, notice);
};

export const deleteNotice = async (noticeId: number) => {
  return await deleteFetch(`${BASE_URL}/notices/${noticeId}`);
};
