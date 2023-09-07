import { ACCESS_TOKEN_KEY } from '@constants/localStorage';
import { REFRESH_EXPIRATION_TIME } from '@constants/token';

import { decodeToken } from './cookie';
import { getLocalStorage } from './localStorage';

export const isExpiredRefreshToken = () => {
  const accessToken = getLocalStorage<string>(ACCESS_TOKEN_KEY);

  if (!accessToken) return true;

  const decodedToken = decodeToken(accessToken);

  const currentTime = Math.floor(new Date().getTime() / 1000);
  const issuedTime = decodedToken.iat;

  const refreshTokenExpirationPeriod = issuedTime + REFRESH_EXPIRATION_TIME;

  return currentTime > refreshTokenExpirationPeriod;
};
