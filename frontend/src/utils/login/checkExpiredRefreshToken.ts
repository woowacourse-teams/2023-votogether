import { AccessToken } from '@type/token';

import { REFRESH_EXPIRATION_TIME } from '@constants/token';

export const checkExpiredRefreshToken = ({
  decodedToken,
  currentTime,
}: {
  decodedToken: AccessToken;
  currentTime: number;
}) => {
  const issuedTime = decodedToken.iat;

  const refreshTokenExpirationPeriod = issuedTime + REFRESH_EXPIRATION_TIME;

  return currentTime > refreshTokenExpirationPeriod;
};
