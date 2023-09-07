import { ACCESS_TOKEN_KEY } from '@constants/localStorage';
import { REFRESH_EXPIRATION_TIME } from '@constants/token';

import { isExpiredRefreshToken } from '@utils/isExpiredRefreshToken';
import { setLocalStorage } from '@utils/localStorage';

describe('리프레시 토큰이 지났는 지 여부를 검증하여 true/false 값을 반환한다.', () => {
  test('액세스 토큰 발급 시간 기준 14일이 지났다면 리프레시 토큰이 만료되었다고 판단하여 true를 반환한다.', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1693929083 + REFRESH_EXPIRATION_TIME + 10000));

    /**
     * {
        "memberId": 1,
        "iat": 1693837083,
        "exp": 1693929083
        }
     */
    const ACCESS_TOKEN =
      'eyJtZW1iZXJJZCI6NiwiaWF0IjoxNjkzODM2NTgzLCJleHAiOjE2OTM5MjI5ODMsImFsZyI6IkhTMjU2In0.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNjkzODM3MDgzLCJleHAiOjE2OTM5MjkwODN9.SYzSL7N8Eo40HW9iJN1YVSWK3H-jkODbP5zX9Dvaji4';

    setLocalStorage(ACCESS_TOKEN_KEY, ACCESS_TOKEN);

    const result = isExpiredRefreshToken();

    expect(result).toBe(true);
  });

  test('액세스 토큰 발급 시간 기준 14일이 지나지 않았다면 리프레시 토큰이 만료되지 않았다고 판단하여 false를 반환한다.', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1693929083 - 10000));

    /**
     * {
        "memberId": 1,
        "iat": 1693837083,
        "exp": 1693929083
        }
     */
    const ACCESS_TOKEN =
      'eyJtZW1iZXJJZCI6NiwiaWF0IjoxNjkzODM2NTgzLCJleHAiOjE2OTM5MjI5ODMsImFsZyI6IkhTMjU2In0.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNjkzODM3MDgzLCJleHAiOjE2OTM5MjkwODN9.SYzSL7N8Eo40HW9iJN1YVSWK3H-jkODbP5zX9Dvaji4';

    setLocalStorage(ACCESS_TOKEN_KEY, ACCESS_TOKEN);

    const result = isExpiredRefreshToken();

    expect(result).toBe(false);
  });
});
