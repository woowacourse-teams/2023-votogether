import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { isExpiredAccessToken } from './isExpiredAccessToken';
import { isExpiredRefreshToken } from './isExpiredRefreshToken';
import { removeLocalStorage } from './localStorage';

export const isRefreshTokenRequested = () => {
  if (!isExpiredAccessToken()) {
    return false;
  }

  if (isExpiredRefreshToken()) {
    removeLocalStorage(ACCESS_TOKEN_KEY);

    return false;
  }

  return true;
};
