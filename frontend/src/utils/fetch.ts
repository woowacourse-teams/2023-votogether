const ACCESS_TOKEN = localStorage.getItem('accessToken');

const headers = {
  'Content-Type': 'application/json;charset=utf-8',
  Authorization: `Bearer ${ACCESS_TOKEN}`,
};

const multiHeaders = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Bearer ${ACCESS_TOKEN}`,
};

export const getFetch = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const postFetch = async <T, R>(url: string, body: T): Promise<R | void> => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const putFetch = async <T, R>(url: string, body: T): Promise<R | void> => {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const patchFetch = async (url: string) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
};

export const deleteFetch = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
};

export const multiPostFetch = async (url: string, body: FormData) => {
  const response = await fetch(url, {
    method: 'POST',
    body,
    headers: multiHeaders,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const multiPutFetch = async (url: string, body: FormData) => {
  const response = await fetch(url, {
    method: 'PUT',
    body,
    headers: multiHeaders,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
