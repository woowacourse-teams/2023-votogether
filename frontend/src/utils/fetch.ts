const headers = {
  'Content-Type': 'application/json;charset=utf-8',
  Authorization: `Bearer `,
};

const multiHeaders = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Bearer `,
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

export const patchFetch = async <T>(url: string, body?: T) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return response;
};

export const deleteFetch = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers,
  });

  return response;
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
