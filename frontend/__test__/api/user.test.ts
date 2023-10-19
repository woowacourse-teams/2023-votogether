import {
  withdrawalMembership,
  getUserInfo,
  modifyNickname,
  transformUserInfoResponse,
  logoutUser,
} from '@api/userInfo';

import { REFRESH_EXPIRATION_TIME } from '@constants/token';

import { getCookie, setCookie } from '@utils/cookie';

import { MOCK_ADMIN_USER_INFO, MOCK_USER_INFO } from '@mocks/mockData/user';

describe('서버와 통신하여 유저의 정보를 불러올 수 있어야 한다.', () => {
  const isLoggedIn = true;
  const isNotLoggedIn = false;

  test('비회원일때는 null을 반환한다.', async () => {
    const data = await getUserInfo(isNotLoggedIn);

    expect(data).toEqual(null);
  });

  test('유저의 정보를 불러온다', async () => {
    const data = await getUserInfo(isLoggedIn);

    expect(data).toEqual(transformUserInfoResponse(MOCK_ADMIN_USER_INFO));
  });

  test('클라이언트에서 사용하는 유저 정보 API 명세가 [nickname, gender, birthYear, postCount, voteCount, hasLatestAlarm, role]으로 존재해야한다', async () => {
    const data = await getUserInfo(isLoggedIn);

    const userInfoKeys = Object.keys(data ?? {});

    expect(userInfoKeys).toEqual([
      'nickname',
      'gender',
      'birthYear',
      'postCount',
      'voteCount',
      'hasLatestAlarm',
      'role',
    ]);
  });

  test('유저의 닉네임을 수정한다', async () => {
    await modifyNickname('wood');

    expect(MOCK_USER_INFO.nickname).toBe('wood');
  });

  test('유저가 회원 탈퇴를 한다', async () => {
    await withdrawalMembership();

    expect(MOCK_USER_INFO.nickname).toBe('cancel');
  });

  test('유저가 로그아웃을 한다', async () => {
    setCookie({ key: 'hasEssentialInfo', maxAge: REFRESH_EXPIRATION_TIME, value: 'REFRESH!!' });

    await logoutUser();

    const result = getCookie().hasEssentialInfo;

    expect(result).toBe(undefined);
  });
});
