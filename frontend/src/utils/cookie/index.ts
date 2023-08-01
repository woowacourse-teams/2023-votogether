type CookieKey = 'accessToken' | 'refreshToken';

export const setCookieToken = (key: CookieKey, token: string) => {
  //secure 속성은 현재 dev에서는 http로 진행중이기 때문에 사용할 수 없음
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(token)}; `;
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
