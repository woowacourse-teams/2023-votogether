import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthResponse } from '@type/auth';

import { AuthContext } from '@hooks/context/auth';

import { getCookieToken, setCookieToken } from '@utils/cookie';
import { getFetch } from '@utils/fetch';

const getAuthInfo = async (url: string): Promise<AuthResponse> => {
  return await getFetch<AuthResponse>(url);
};

export default function Redirection() {
  const { loggedInfo, setLoggedInfo } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setErrorMessage('');

      const params = new URL(document.location.toString()).searchParams;
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
          if (!res) return setErrorMessage('잘못된 형식의 response');

          const { accessToken } = res;
          setCookieToken('accessToken', accessToken);

          setLoggedInfo({
            ...loggedInfo,
            accessToken: getCookieToken().accessToken,
            isLogged: true,
          });

          navigate('/');
        });
    })();
  }, [navigate, loggedInfo, setLoggedInfo]);

  return (
    <div>
      {isLoading && '로그인 중입니다...'}
      {errorMessage && errorMessage}
    </div>
  );
}
