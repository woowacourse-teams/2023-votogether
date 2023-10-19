type CookieKey = 'hasEssentialInfo' | 'isAppInstallVisible' | 'isBannerVisible';

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

// token형식 = "key=value; key=value; key=value"
export const getCookie = (): Record<CookieKey, string> => {
  const cookie = document.cookie;
  const cookieContent = cookie.split('; ').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    return { ...acc, [key]: value };
  }, {}) as Record<CookieKey, string>;

  return cookieContent;
};

export const clearCookie = (key: string) => {
  const expirationTime = new Date(Date.now() - 1);
  document.cookie = `${encodeURIComponent(key)}=; expires=${expirationTime.toUTCString()}; path=/;`;
};
