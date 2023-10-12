import { deleteFetch, getFetch, patchFetch, postFetch } from '@utils/fetch';

export const transformNotice = ({
  id,
  title,
  content,
  createdAt,
  deadline,
  bannerTitle,
  bannerSubtitle,
}: NoticeResponse) => {
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

export type NoticeRequest = Omit<NoticeResponse, 'createdAt' | 'id'>;

const BASE_URL = process.env.VOTOGETHER_BASE_URL ?? '';

export const createNotice = async (notice: NoticeRequest) => {
  await postFetch(`${BASE_URL}/notices`, notice);
};

export const getBannerNotice = async () => {
  return await getFetch(`${BASE_URL}/notices/progress`);
};

export const getNoticeList = async (page: number) => {
  return await getFetch(`${BASE_URL}/notices?page=${page}`);
};

export const getNoticeDetail = async (noticeId: number) => {
  return await getFetch(`${BASE_URL}/notices/${noticeId}`);
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
