import {
  cancelMembership,
  getUserInfo,
  modifyNickname,
  transformUserInfoResponse,
} from '@api/userInfo';

import { MOCK_USER_INFO } from '@mocks/mockData/user';

describe('서버와 통신하여 유저의 정보를 불러올 수 있어야 한다.', () => {
  test('유저의 정보를 불러온다', async () => {
    const data = await getUserInfo();

    expect(data).toEqual(transformUserInfoResponse(MOCK_USER_INFO));
  });

  test('클라이언트에서 사용하는 유저 정보 API 명세가 [nickname, postCount, userPoint, userPoint, badge]으로 존재해야한다', async () => {
    const data = await getUserInfo();

    const userInfoKeys = Object.keys(data);

    expect(userInfoKeys).toEqual(['nickname', 'postCount', 'userPoint', 'voteCount', 'badge']);
  });

  test('유저의 닉네임을 수정한다', async () => {
    await modifyNickname('wood');

    expect(MOCK_USER_INFO.nickname).toBe('wood');
  });

  test('유저가 회원 탈퇴를 한다', async () => {
    await cancelMembership();

    expect(MOCK_USER_INFO.nickname).toBe('cancel');
  });
});
