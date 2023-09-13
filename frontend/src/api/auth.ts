import { AuthResponse } from '@type/auth';

import { makeFetchHeaders } from '@utils/fetch';

export const getAuthInfo = async (url: string): Promise<AuthResponse> => {
  return await getLoginFetch<AuthResponse>(url);
};

const getLoginFetch = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: makeFetchHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
};
