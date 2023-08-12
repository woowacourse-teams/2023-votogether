import { getCookieToken, getMemberId } from '@utils/cookie';

export function checkWriter(writedId: number) {
  const accessToken = getCookieToken().accessToken;
  const memberId = getMemberId(accessToken).memberId;

  return writedId === memberId;
}
