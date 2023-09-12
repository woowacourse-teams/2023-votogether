import { AccessToken } from '@type/token';

export const isExpiredAccessToken = ({
  decodedToken,
  currentTime,
}: {
  decodedToken: AccessToken;
  currentTime: number;
}) => {
  const accessTokenExpirationPeriod = decodedToken.exp;

  return currentTime >= accessTokenExpirationPeriod;
};
