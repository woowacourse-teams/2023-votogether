import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Redirection() {
  const navigate = useNavigate();
  //매우 긴 URL에서 code 값 추출
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

  useEffect(() => {
    const BASE_PATH = 'http://3.35.232.54/api';
    const REGISTER_API_URL = `${BASE_PATH}/auth/kakao/callback?code=${code}`;

    fetch(REGISTER_API_URL, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {},
    })
      .then(response => response.json())
      .then(result => {
        window.console.log(result);
        navigate('/');
      })
      .catch(e => window.console.log(e));
  }, []);

  return <div>로그인 중입니다...</div>;
}
