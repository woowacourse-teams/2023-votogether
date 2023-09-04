import { getCookieToken, decodeToken } from '@utils/cookie';

export function checkWriter(writerId: number) {
  const accessToken = getCookieToken().accessToken;
  const memberId = decodeToken(accessToken).memberId;

  return writerId === memberId;
}
