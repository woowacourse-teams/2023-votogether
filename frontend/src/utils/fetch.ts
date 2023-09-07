import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { getLocalStorage } from './localStorage';
import { silentLogin } from './silentLogin';

const headers = {
  'Content-Type': 'application/json',
};

const makeFetchHeaders = () => {
  const accessToken = getLocalStorage(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return headers;
  }

  return {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
  };
};

const makeFetchMultiHeaders = () => {
  const accessToken = getLocalStorage(ACCESS_TOKEN_KEY);

  return {
    Authorization: `Bearer ${accessToken}`,
  };
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
