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
  const response = await fetch(url, {
    method: 'GET',
    headers: makeFetchHeaders(),
  });

  if (!response.ok) {
    throw new Error('에러');
  }

  const data = await response.json();
  return data;
};

export const postFetch = async <T>(url: string, body: T): Promise<void> => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: makeFetchHeaders(),
  });

  if (!response.ok) {
    throw new Error('에러');
  }

  // const data = await response.json();

  return;
};

export const putFetch = async <T, R>(url: string, body: T): Promise<R | void> => {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: makeFetchHeaders(),
  });

  // const data = await response.json();

  if (!response.ok) {
    throw new Error('error');
  }

  return;
};

export const patchFetch = async <T>(url: string, body?: T) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: makeFetchHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('에러');
  }

  return response;
};

export const deleteFetch = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: makeFetchHeaders(),
  });

  return response;
};

export const multiPostFetch = async (url: string, body: FormData) => {
  const response = await fetch(url, {
    method: 'POST',
    body,
    headers: makeFetchMultiHeaders(),
  });

  // const data = await response.json();

  if (!response.ok) {
    throw new Error('error');
  }

  return;
};

export const multiPutFetch = async (url: string, body: FormData) => {
  const response = await fetch(url, {
    method: 'PUT',
    body,
    headers: makeFetchMultiHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
