import { useNavigate } from 'react-router-dom';

import kakao from '@assets/kakao_login_large.webp';
import logo from '@assets/stroke-logo.svg';

import * as S from './style';

export default function MobileLogin() {
  const navigate = useNavigate();
  const CLIENT_ID = `${process.env.VOTOGETHER_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.VOTOGETHER_SERVER_REDIRECT_URL}`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <S.Container>
      <S.LogoImage src={logo} alt="보투게더 로고" />
      <S.LogoTitle>VOTOGETHER</S.LogoTitle>
      <S.LoginButton onClick={() => (window.location.href = kakaoURL)}>
        <S.KaKaoImage src={kakao} alt="카카오 로그인" />
      </S.LoginButton>
      <S.GuestButton onClick={() => navigate('/')}>비회원으로 이용하기</S.GuestButton>
    </S.Container>
  );
}
