import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { isExpiredAccessToken } from '@utils/isExpiredAccessToken';
import { setLocalStorage } from '@utils/localStorage';

describe('액세스 토큰이 지났는 지 여부를 검증하여 true/false 값을 반환한다.', () => {
  test('액세스 토큰이 없다면 비회원이라고 생각하여 true를 반환한다.', () => {
    const result = isExpiredAccessToken();

    expect(result).toBe(true);
  });

  test('액세스 토큰의 만료 시간이 현재 시간 기준으로 지났다면 true를 반환한다.', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1693929083000 + 10000));

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

    const result = isExpiredAccessToken();

    expect(result).toBe(true);
  });

  test('액세스 토큰의 만료 시간이 현재 시간 기준으로 지나지 않았다면 false를 반환한다.', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1693929083000 - 10000));

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

    const result = isExpiredAccessToken();

    expect(result).toBe(false);
  });
});
