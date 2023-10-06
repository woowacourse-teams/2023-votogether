import { ACCESS_TOKEN_KEY } from '@constants/localStorage';
import { REFRESH_EXPIRATION_TIME } from '@constants/token';

import { getLocalStorage, setLocalStorage } from '@utils/localStorage';
import { checkRefreshTokenRequired } from '@utils/login/checkRefreshTokenRequired';

describe('액세스 토큰의 정보를 통해 검증하여 리프레시 토큰 재발급 요청을 보낼지 여부를 true/false 값으로 반환한다.', () => {
  test('액세스 토큰이 없다면 비회원 상태라고 판단하여 리프레시 토큰 재발급 요청을 하지 않는다.', () => {
    const result = checkRefreshTokenRequired();

    expect(result).toBe(false);
  });

  test('액세스 토큰 발급 시간 기준 14일이 지났다면 리프레시 토큰 재발급 요청을 하지 않고, 액세스 토큰을 삭제한다.', () => {
    const ISSUED_TIME = 1693837083 * 1000;
    jest.useFakeTimers();
    jest.setSystemTime(new Date(ISSUED_TIME + REFRESH_EXPIRATION_TIME * 1000 + 10000));

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

    const result = checkRefreshTokenRequired();

    const accessToken = getLocalStorage(ACCESS_TOKEN_KEY);

    expect(result).toBe(false);
    expect(accessToken).toBe(null);
  });

  test('액세스 토큰 발급 시간 기준 14일이 지나지 않았고, 액세스 토큰이 만료되었다면 리프레시 토큰 재발급 요청을 한다.', () => {
    const EXPIRED_TIME = 1693929083 * 1000;
    jest.useFakeTimers();
    jest.setSystemTime(new Date(EXPIRED_TIME + 10000));

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

    const result = checkRefreshTokenRequired();

    expect(result).toBe(true);
  });

  test('액세스 토큰 발급 시간 기준 14일이 지나지 않았고, 액세스 토큰이 만료되지 않았다면 리프레시 토큰 재발급 요청을 하지 않는다.', () => {
    const EXPIRED_TIME = 1693929083 * 1000;
    jest.useFakeTimers();
    jest.setSystemTime(new Date(EXPIRED_TIME - 10000));

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

    const result = checkRefreshTokenRequired();

    expect(result).toBe(false);
  });
});
