import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { getLocalStorage, removeLocalStorage } from '@utils/localStorage';

import { decodeToken } from './decodeToken';
import { isExpiredAccessToken } from './isExpiredAccessToken';
import { isExpiredRefreshToken } from './isExpiredRefreshToken';

export const isRefreshTokenRequested = () => {
  const accessToken = getLocalStorage<string>(ACCESS_TOKEN_KEY);

  const isGuest = !accessToken;

  if (isGuest) return false;

  const decodedToken = decodeToken(accessToken);
  const currentTime = Math.floor(new Date().getTime() / 1000);

  if (!isExpiredAccessToken({ decodedToken, currentTime })) {
    return false;
  }

  if (isExpiredRefreshToken({ decodedToken, currentTime })) {
    removeLocalStorage(ACCESS_TOKEN_KEY);

    return false;
  }

  return true;
};
