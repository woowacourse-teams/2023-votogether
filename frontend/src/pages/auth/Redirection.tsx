import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthResponse } from '@type/auth';

import { AuthContext } from '@hooks/context/auth';

import Error from '@pages/Error';

import LoadingSpinner from '@components/common/LoadingSpinner';

import { getCookieToken, setCookieToken } from '@utils/cookie';
import { getFetch } from '@utils/fetch';

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
    (async () => {
      setIsLoading(true);
      setErrorMessage('');

      const code = params.get('code');
      const REGISTER_API_URL = `${process.env.VOTOGETHER_BASE_URL}/auth/kakao/callback?code=${code}`;

      await getAuthInfo(REGISTER_API_URL)
        .finally(() => {
          setIsLoading(false);
        })
        .catch(error => {
          setErrorMessage(error.message);
        })
        .then(res => {
          if (!res) {
            return setErrorMessage('로그인 중 오류가 발생했습니다.');
          }

          const { accessToken } = res;
          setCookieToken('accessToken', accessToken);

          setLoggedInfo({
            ...loggedInfo,
            accessToken: getCookieToken().accessToken,
            isLoggedIn: true,
          });

          navigate('/');
        });
    })();
  }, [navigate, loggedInfo, setLoggedInfo, params]);

  if (isLoading)
    return (
      <div style={{ margin: '100px' }}>
        <LoadingSpinner size="md" />
      </div>
    );

  if (errorMessage) return <Error message={errorMessage} />;
}
