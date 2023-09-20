interface SilentLoginToken {
  accessToken: string;
}

const BASE_URL = process.env.VOTOGETHER_BASE_URL ?? '';

export const postTokens = async (accessToken: string): Promise<SilentLoginToken> => {
  const response = await fetch(`${BASE_URL}/auth/silent-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error');
  }

  return await response.json();
};
