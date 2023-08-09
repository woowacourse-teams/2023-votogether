import { getCookieToken } from './cookie';

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

export const getFetch = async <T>(url: string): Promise<T> => {
  try {
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
    const response = await fetch(url, {
      method: 'POST',
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

export const putFetch = async <T>(url: string, body: T) => {
  try {
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
