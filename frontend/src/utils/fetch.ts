import { getCookieToken, setCookieToken } from './cookie';
import { isExpiredAccessToken } from './isExpiredAccessToken';

const headers = {
  Authorization: `Bearer `,
  'Content-Type': 'application/json',
};

const makeFetchHeaders = () => {
  const cookie = getCookieToken();

  return {
    ...headers,
    Authorization: `Bearer ${cookie.accessToken}`,
  };
};

const makeFetchMultiHeaders = () => {
  const cookie = getCookieToken();

  return {
    Authorization: `Bearer ${cookie.accessToken}`,
  };
};

interface SilentLoginToken {
  accessToken: string;
  refreshToken: string;
}

export const silentLogin = async () => {
  const refreshToken = getCookieToken().refreshToken;

  if (!refreshToken || !isExpiredAccessToken()) {
    return;
  }

  try {
    const response = await postFetch('/auth/silent-login', {
      refreshToken,
    });

    if (!response) {
      throw new Error('error');
    }

    const tokenData = (await response.json()) as SilentLoginToken;

    const updatedAccessToken = tokenData.accessToken;
    const updatedRefreshToken = tokenData.refreshToken;

    setCookieToken('accessToken', updatedAccessToken);
    setCookieToken('refreshToken', updatedRefreshToken);
  } catch (error) {
    window.location.href = '/login';
    throw new Error('로그인에 실패했습니다. 다시 로그인 해주세요.');
  }
};

export const getFetch = async <T>(url: string): Promise<T> => {
  try {
    await silentLogin();
    const response = await fetch(url, {
      method: 'GET',
      headers: makeFetchHeaders(),
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

export const postFetch = async <T>(url: string, body: T) => {
  try {
    await silentLogin();
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: makeFetchHeaders(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return response;
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
};

export const putFetch = async <T>(url: string, body: T) => {
  try {
    await silentLogin();
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: makeFetchHeaders(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
};

export const patchFetch = async <T>(url: string, body?: T) => {
  try {
    await silentLogin();
    const response = await fetch(url, {
      method: 'PATCH',
      headers: makeFetchHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
};

export const deleteFetch = async (url: string) => {
  try {
    await silentLogin();
    const response = await fetch(url, {
      method: 'DELETE',
      headers: makeFetchHeaders(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
};

export const multiPostFetch = async (url: string, body: FormData) => {
  try {
    await silentLogin();
    const response = await fetch(url, {
      method: 'POST',
      body,
      headers: makeFetchMultiHeaders(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
};

export const multiPutFetch = async (url: string, body: FormData) => {
  try {
    await silentLogin();
    const response = await fetch(url, {
      method: 'PUT',
      body,
      headers: makeFetchMultiHeaders(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
};
