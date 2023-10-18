import { UserInfoResponse } from '@api/userInfo';

export const MOCK_ADMIN_USER_INFO: UserInfoResponse = {
  nickname: '우아한 코끼리',
  gender: 'MALE',
  birthYear: 1989,
  postCount: 4,
  voteCount: 128,
  hasLatestAlarm: true,
  role: 'ADMIN',
};

export const MOCK_USER_INFO: UserInfoResponse = {
  nickname: '우아한 코끼리',
  gender: 'MALE',
  birthYear: 1989,
  postCount: 4,
  voteCount: 128,
  hasLatestAlarm: true,
  role: 'USER',
};
