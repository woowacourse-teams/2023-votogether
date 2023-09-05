type CookieKey = 'accessToken' | 'refreshToken' | 'hasEssentialInfo';

interface setCookieInfo {
  key: CookieKey;
  token: string;
  maxAge: number;
}
export const setCookieToken = ({ key, token, maxAge }: setCookieInfo) => {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    token
  )}; max-age=${maxAge}; path=/`;
};

// token형식 = "key=value; key=value; key=value"
export const getCookieToken = () => {
  const cookie = document.cookie;
  const cookieContent = {} as { [key: string]: any };
  cookie.split('; ').forEach(pair => {
    const [key, value] = pair.split('=');
    cookieContent[key] = value;
  });

  return cookieContent as Record<CookieKey, any>;
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

export const clearCookieToken = (key: CookieKey) => {
  const expirationTime = new Date(Date.now() - 1);
  document.cookie = `${encodeURIComponent(key)}=; expires=${expirationTime.toUTCString()}; path=/;`;
};
