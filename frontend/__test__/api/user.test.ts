import { getUserInfo, transformUserInfoResponse } from '@api/wus/userInfo';

import { MOCK_USER_INFO } from '@mocks/mockData/user';

describe('서버와 통신하여 유저의 정보를 불러올 수 있어야 한다.', () => {
  test('유저의 정보를 불러온다', async () => {
    const data = await getUserInfo();

    expect(data).toEqual(transformUserInfoResponse(MOCK_USER_INFO));
  });
});
