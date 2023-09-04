import { getCookieToken, getMemberId } from '@utils/cookie';

export function checkWriter(writerId: number) {
  const accessToken = getCookieToken().accessToken;
  const memberId = getMemberId(accessToken).memberId;

  return writerId === memberId;
}
