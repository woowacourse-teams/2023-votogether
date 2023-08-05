type CookieKey = 'accessToken' | 'refreshToken';

export const setCookieToken = (key: CookieKey, token: string) => {
  //secure 속성은 현재 dev에서는 http로 진행중이기 때문에 사용할 수 없음
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(token)}; path=/`;
};

// token형식 = "key=value; key=value; key=value"
export function getCookieToken() {
  const cookie = document.cookie;
  const cookieContent = {} as { [key: string]: any };
  cookie.split('; ').forEach(pair => {
    const [key, value] = pair.split('=');
    cookieContent[key] = value;
  });

  return cookieContent as Record<CookieKey, any>;
}

interface MemberPayload {
  memberId: number;
  iat: number;
  exp: number;
}

export function getMemberId(token: string): MemberPayload {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedData = JSON.parse(atob(base64));

  return decodedData;
}

export const clearCookieToken = (key: CookieKey) => {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
