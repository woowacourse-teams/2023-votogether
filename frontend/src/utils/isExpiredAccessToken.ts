import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { decodeToken } from './cookie';
import { getLocalStorage } from './localStorage';

export const isExpiredAccessToken = () => {
  const accessToken = getLocalStorage<string>(ACCESS_TOKEN_KEY);

  if (!accessToken) return true;

  const decodedToken = decodeToken(accessToken);

  const currentTime = Math.floor(new Date().getTime() / 1000);
  const accessTokenExpirationPeriod = decodedToken.exp;

  return currentTime >= accessTokenExpirationPeriod;
};
