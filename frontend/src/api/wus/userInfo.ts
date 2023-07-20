import type { UserInfoResponse, User } from '@type/user';

import { getFetch } from '@utils/fetch';

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
