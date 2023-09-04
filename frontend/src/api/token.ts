interface SilentLoginToken {
  accessToken: string;
  refreshToken: string;
}

const BASE_URL = process.env.VOTOGETHER_BASE_URL ?? '';

export const postTokens = async (refreshToken: string): Promise<SilentLoginToken> => {
  const response = await fetch(`${BASE_URL}/auth/silent-login`, {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('error');
  }

  return await response.json();
};
