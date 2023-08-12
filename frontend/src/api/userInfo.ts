import type { UserInfoResponse, User, ModifyNicknameRequest } from '@type/user';

import { deleteFetch, getFetch, patchFetch } from '@utils/fetch';

export const transformUserInfoResponse = (userInfo: UserInfoResponse): User => {
  const { nickname, postCount, gender, voteCount, birthYear } = userInfo;

  return {
    nickname,
    postCount,
    gender,
    voteCount,
    birthYear,
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
