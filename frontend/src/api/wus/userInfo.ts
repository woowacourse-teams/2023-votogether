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

export const getUserInfo = async () => {
  const userInfo = await getFetch<UserInfoResponse>('/members/me');

  return transformUserInfoResponse(userInfo);
};

export const modifyNickname = async (nickname: string) => {
  await patchFetch<ModifyNicknameRequest>('/members/me/nickname', { nickname });
};

export const cancelMembership = async () => {
  await deleteFetch('/members/me/delete');
};
