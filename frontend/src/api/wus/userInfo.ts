import type { UserInfoResponse, User, ModifyNicknameRequest } from '@type/user';

import { deleteFetch, getFetch, patchFetch } from '@utils/fetch';

export const transformUserInfoResponse = (userInfo: UserInfoResponse): User => {
  const { nickname, postCount, userPoint, voteCount, badge } = userInfo;

  return {
    nickname,
    postCount,
    userPoint,
    voteCount,
    badge,
  };
};

const BASE_URL = process.env.API_URL;

export const getUserInfo = async () => {
  const userInfo = await getFetch<UserInfoResponse>(`${BASE_URL}/members/me`);

  return transformUserInfoResponse(userInfo);
};

export const modifyNickname = async (nickname: string) => {
  await patchFetch<ModifyNicknameRequest>(`${BASE_URL}/members/me/nickname`, { nickname });
};

export const cancelMembership = async () => {
  await deleteFetch(`${BASE_URL}/members/me/delete`);
};
