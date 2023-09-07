type CookieKey = 'hasEssentialInfo' | 'isAppInstallVisible';

export const setCookie = ({
  key,
  value,
  maxAge,
}: {
  key: CookieKey;
  value: string;
  maxAge: number;
}) => {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    value
  )}; max-age=${maxAge}; path=/`;
};

export const getCookie = (): Record<CookieKey, string> => {
  const cookie = document.cookie;
  const cookieContent = cookie.split('; ').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    return { ...acc, [key]: value };
  }, {}) as Record<CookieKey, string>;

  return cookieContent;
};

interface MemberPayload {
  memberId: number;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): MemberPayload => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedData = JSON.parse(atob(base64));

  return decodedData;
};

export const clearCookie = (key: string) => {
  const expirationTime = new Date(Date.now() - 1);
  document.cookie = `${encodeURIComponent(key)}=; expires=${expirationTime.toUTCString()}; path=/;`;
};
