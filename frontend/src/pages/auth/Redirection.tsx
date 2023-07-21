import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';
import { useFetch } from '@hooks/useFetch';

import { getFetch } from '@utils/fetch';

interface AuthResponse {
  accessToken: string;
  nickname: string;
}

const getAuthInfo = async (url: string): Promise<AuthResponse> => {
  return await getFetch<AuthResponse>(url);
};

export default function Redirection() {
  const { loggedInfo, setLoggedInfo } = useContext(AuthContext);

  const navigate = useNavigate();
  //매우 긴 URL에서 code 값 추출
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

  const REGISTER_API_URL = `${process.env.API_URL}/auth/kakao/callback?code=${code}`;

  const { data, isLoading } = useFetch<AuthResponse>(() => getAuthInfo(REGISTER_API_URL));
  window.console.log(REGISTER_API_URL);
  window.console.log(data);

  if (data) {
    const { accessToken, nickname } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('nickname', nickname);

    setLoggedInfo({
      ...loggedInfo,
      accessToken: accessToken,
      nickname: nickname,
      isLogin: true,
    }); // 수정 필요

    navigate('/');
  }

  return <div>{isLoading && '로그인 중입니다...'}</div>;
}
