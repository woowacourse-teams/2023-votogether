import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';

import { getAuthInfo } from '@api/auth';

import ErrorPage from '@pages/ErrorPage';

import LoadingSpinner from '@components/common/LoadingSpinner';

import { ESSENTIAL_MAX_AGE } from '@constants/cookie';
import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { setCookie } from '@utils/cookie';
import { setLocalStorage } from '@utils/localStorage';
import { decodeToken } from '@utils/login/decodeToken';

export default function RedirectionPage() {
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

  if (errorMessage) return <ErrorPage message={errorMessage} />;
}
