import { postTokens } from '@api/token';

import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../localStorage';

import { isRefreshTokenRequested } from './isRefreshTokenRequested';

let isRequest = false;

export const silentLogin = async () => {
  if (!isRefreshTokenRequested() || isRequest) {
    return;
  }

  isRequest = true;

  try {
    const accessToken = getLocalStorage<string>(ACCESS_TOKEN_KEY);

    if (!accessToken) return;

    const tokenData = await postTokens(accessToken);

    const updatedAccessToken = tokenData.accessToken;

    setLocalStorage(ACCESS_TOKEN_KEY, updatedAccessToken);
  } catch (error) {
    removeLocalStorage(ACCESS_TOKEN_KEY);
    window.location.href = '/login';

    throw new Error('로그인에 실패했습니다. 다시 로그인 해주세요.');
  } finally {
    isRequest = false;
  }
};
