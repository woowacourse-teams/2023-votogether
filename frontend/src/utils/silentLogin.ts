import { postTokens } from '@api/token';

import { TOKEN_MAX_AGE } from '@constants/cookie';

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

    setCookieToken({ key: 'accessToken', token: updatedAccessToken, maxAge: TOKEN_MAX_AGE });
    setCookieToken({ key: 'refreshToken', token: updatedRefreshToken, maxAge: TOKEN_MAX_AGE });
  } catch (error) {
    clearCookieToken('accessToken');
    clearCookieToken('refreshToken');
    window.location.href = '/login';

    throw new Error('로그인에 실패했습니다. 다시 로그인 해주세요.');
  }
};
