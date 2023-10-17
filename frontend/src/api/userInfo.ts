import type { User } from '@type/user';

import { deleteFetch, getFetch, patchFetch } from '@utils/fetch';

export interface UserInfoResponse {
  nickname: string;
  gender: 'FEMALE' | 'MALE';
  birthYear: number;
  postCount: number;
  voteCount: number;
  hasLatestAlarm: boolean;
  role: 'ADMIN' | 'USER';
}

export interface ModifyNicknameRequest {
  nickname: string;
}

export interface UpdateUserInfoRequest {
  gender: 'MALE' | 'FEMALE';
  birthYear: number;
}

export const transformUserInfoResponse = (userInfo: UserInfoResponse): User => {
  const { nickname, gender, birthYear, postCount, voteCount, hasLatestAlarm, role } = userInfo;

  return {
    nickname,
    gender,
    birthYear,
    postCount,
    voteCount,
    hasLatestAlarm,
    role,
  };
};

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const getUserInfo = async (isLoggedIn: boolean): Promise<User | null> => {
  if (!isLoggedIn) return null;

  const userInfo = await getFetch<UserInfoResponse>(`${BASE_URL}/members/me`);

  return transformUserInfoResponse(userInfo);
};

export const modifyNickname = async (nickname: string) => {
  await patchFetch<ModifyNicknameRequest>(`${BASE_URL}/members/me/nickname`, { nickname });
};

export const withdrawalMembership = async () => {
  await deleteFetch(`${BASE_URL}/members/me/delete`);
};

export const updateUserInfo = async (userInfo: UpdateUserInfoRequest) => {
  await patchFetch<UpdateUserInfoRequest>(`${BASE_URL}/members/me/detail`, userInfo);
};

export const readLatestAlarm = async () => {
  await patchFetch(`${BASE_URL}/members/me/check-alarm`);
};

export const logoutUser = async () => {
  await fetch('/auth/logout', { method: 'DELETE', credentials: 'include' });
};
