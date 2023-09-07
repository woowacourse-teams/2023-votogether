import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthResponse } from '@type/auth';

import { AuthContext } from '@hooks/context/auth';

import Error from '@pages/Error';

import LoadingSpinner from '@components/common/LoadingSpinner';

import { ESSENTIAL_MAX_AGE } from '@constants/cookie';
import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { setCookie } from '@utils/cookie';
import { getFetch } from '@utils/fetch';
import { setLocalStorage } from '@utils/localStorage';
import { decodeToken } from '@utils/token/decodeToken';

const getAuthInfo = async (url: string): Promise<AuthResponse> => {
  return await getFetch<AuthResponse>(url);
};

export default function Redirection() {
  const { loggedInfo, setLoggedInfo } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [params] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const authInfoFetch = async () => {
      setIsLoading(true);
      setErrorMessage('');

      const code = params.get('code');
      const REGISTER_API_URL = `${process.env.VOTOGETHER_BASE_URL}/auth/kakao/callback?code=${code}`;
      try {
        const { accessToken, hasEssentialInfo } = await getAuthInfo(REGISTER_API_URL);
        setLocalStorage(ACCESS_TOKEN_KEY, accessToken);

        setCookie({
          key: 'hasEssentialInfo',
          value: String(hasEssentialInfo),
          maxAge: ESSENTIAL_MAX_AGE,
        });

        const decodedPayload = decodeToken(accessToken);
        const id = decodedPayload.memberId;

        setLoggedInfo({
          ...loggedInfo,
          id,
          accessToken,
          isLoggedIn: true,
        });

        navigate('/');
      } catch (error) {
        setErrorMessage('로그인 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    authInfoFetch();
  }, [navigate, loggedInfo, setLoggedInfo, params]);

  if (isLoading)
    return (
      <div style={{ margin: '100px' }}>
        <LoadingSpinner size="md" />
      </div>
    );

  if (errorMessage) return <Error message={errorMessage} />;
}
