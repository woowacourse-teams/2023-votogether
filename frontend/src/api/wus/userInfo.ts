import { ServerUser, User } from '@type/user';

import { getFetch } from '@utils/fetch';

export const transformUserInfoResponse = (userInfo: ServerUser): User => {
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
  const userInfo = await getFetch<ServerUser>('/members/me');

  return transformUserInfoResponse(userInfo);
};
