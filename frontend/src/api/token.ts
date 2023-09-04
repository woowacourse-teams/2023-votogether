import { postFetch } from '@utils/fetch';

interface SilentLoginToken {
  accessToken: string;
  refreshToken: string;
}

const BASE_URL = process.env.VOTOGETHER_BASE_URL ?? '';

export const postTokens = async (refreshToken: string): Promise<SilentLoginToken> => {
  const response = await postFetch(`${BASE_URL}/auth/silent-login`, {
    refreshToken,
  });

  if (!response) {
    throw new Error('error');
  }

  return await response.json();
};
