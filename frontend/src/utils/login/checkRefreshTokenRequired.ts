import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { getLocalStorage, removeLocalStorage } from '@utils/localStorage';

import { checkExpiredAccessToken } from './checkExpiredAccessToken';
import { checkExpiredRefreshToken } from './checkExpiredRefreshToken';
import { decodeToken } from './decodeToken';

export const checkRefreshTokenRequired = () => {
  const accessToken = getLocalStorage<string>(ACCESS_TOKEN_KEY);

  const isGuest = !accessToken;

  if (isGuest) return false;

  const decodedToken = decodeToken(accessToken);
  const currentTime = Math.floor(new Date().getTime() / 1000);

  if (!checkExpiredAccessToken({ decodedToken, currentTime })) {
    return false;
  }

  if (checkExpiredRefreshToken({ decodedToken, currentTime })) {
    removeLocalStorage(ACCESS_TOKEN_KEY);

    return false;
  }

  return true;
};
