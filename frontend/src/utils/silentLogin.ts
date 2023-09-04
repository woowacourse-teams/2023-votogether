import { postTokens } from '@api/token';

import { clearCookieToken, getCookieToken, setCookieToken } from './cookie';
import { isExpiredAccessToken } from './isExpiredAccessToken';

export const silentLogin = async () => {
  const refreshToken = getCookieToken().refreshToken;

  if (!refreshToken || !isExpiredAccessToken()) {
    return;
  }

  try {
    const tokenData = await postTokens(refreshToken);

    const updatedAccessToken = tokenData.accessToken;
    const updatedRefreshToken = tokenData.refreshToken;

    setCookieToken('accessToken', updatedAccessToken);
    setCookieToken('refreshToken', updatedRefreshToken);
  } catch (error) {
    clearCookieToken('accessToken');
    clearCookieToken('refreshToken');
    window.location.href = '/login';

    throw new Error('로그인에 실패했습니다. 다시 로그인 해주세요.');
  }
};
