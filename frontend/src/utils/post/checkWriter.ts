import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { decodeToken } from '@utils/cookie';
import { getLocalStorage } from '@utils/localStorage';

export function checkWriter(writerId: number) {
  const accessToken = getLocalStorage<string>(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return false;
  }

  const memberId = decodeToken(accessToken).memberId;

  return writerId === memberId;
}
