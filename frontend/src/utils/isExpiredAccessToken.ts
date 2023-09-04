import { decodeToken, getCookieToken } from './cookie';

export const isExpiredAccessToken = () => {
  const accessToken = getCookieToken().accessToken;

  if (!accessToken) return true;

  const decodedToken = decodeToken(accessToken);

  const currentTime = new Date().getTime();
  const expirationPeriod = decodedToken.exp;

  return currentTime >= expirationPeriod;
};
