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

    window.console.log(REGISTER_API_URL);
    fetch(REGISTER_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((res: any) => {
        window.console.log(res);
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem('accessToken', ACCESS_TOKEN);
        navigate('/');
      })
      .catch(e => {
        window.console.log('소셜로그인 에러', e);
        window.alert('로그인에 실패했습니다.');
        navigate('/login');
      });
  }, []);

  return <div>로그인 중입니다...</div>;
}
