import { getCookieToken, setCookieToken } from '@utils/cookie';
import { silentLogin } from '@utils/fetch';

import { MOCK_TOKEN } from '@mocks/mockData/token';

describe('리프레시 토큰을 이용하여 액세스 토큰과 리프레시 토큰을 재발급한다.', () => {
  test('리프레시 토큰이 없다면 액세스 토큰과 리프레시 토큰이 발급되지 않는다.', async () => {
    await silentLogin();

    const accessToken = getCookieToken().accessToken;
    const refreshToken = getCookieToken().refreshToken;

    expect(accessToken).toBe(undefined);
    expect(refreshToken).toBe(undefined);
  });

  test('리프레시 토큰이 있고, 액세스 토큰이 유효 기간을 지나지 않았다면 액세스 토큰과 리프레시 토큰이 발급되지 않는다.', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1693929083 - 1000));

    /**
     * {
        "memberId": 1,
        "iat": 1693837083,
        "exp": 1693929083
        }
     */
    const ACCESS_TOKEN =
      'eyJtZW1iZXJJZCI6NiwiaWF0IjoxNjkzODM2NTgzLCJleHAiOjE2OTM5MjI5ODMsImFsZyI6IkhTMjU2In0.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNjkzODM3MDgzLCJleHAiOjE2OTM5MjkwODN9.SYzSL7N8Eo40HW9iJN1YVSWK3H-jkODbP5zX9Dvaji4';
    const REFRESH_TOKEN = 'refresh!!!';

    setCookieToken('accessToken', ACCESS_TOKEN);
    setCookieToken('refreshToken', REFRESH_TOKEN);

    await silentLogin();

    const accessToken = getCookieToken().accessToken;
    const refreshToken = getCookieToken().refreshToken;

    expect(accessToken).toBe(ACCESS_TOKEN);
    expect(refreshToken).toBe(REFRESH_TOKEN);
  });

  test('리프레시 토큰이 있고, 액세스 토큰이 유효 기간을 지났다면 새로운 액세스 토큰과 리프레시 토큰을 발급한다.', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1693929083 + 1000));

    /**
     * {
        "memberId": 1,
        "iat": 1693837083,
        "exp": 1693929083
        }
     */
    const ACCESS_TOKEN =
      'eyJtZW1iZXJJZCI6NiwiaWF0IjoxNjkzODM2NTgzLCJleHAiOjE2OTM5MjI5ODMsImFsZyI6IkhTMjU2In0.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNjkzODM3MDgzLCJleHAiOjE2OTM5MjkwODN9.SYzSL7N8Eo40HW9iJN1YVSWK3H-jkODbP5zX9Dvaji4';
    const REFRESH_TOKEN = 'refresh!!!';

    setCookieToken('accessToken', ACCESS_TOKEN);
    setCookieToken('refreshToken', REFRESH_TOKEN);

    await silentLogin();

    const accessToken = getCookieToken().accessToken;
    const refreshToken = getCookieToken().refreshToken;

    expect(accessToken).toBe(MOCK_TOKEN.accessToken);
    expect(refreshToken).toBe(MOCK_TOKEN.refreshToken);
  });
});
