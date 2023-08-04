import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import LogoButton from '@components/common/LogoButton';
import SquareButton from '@components/common/SquareButton';

import kakaoLogin from '@assets/kakao_login_medium_wide.svg';

export default function Login() {
  const navigate = useNavigate();
  const CLIENT_ID = `${process.env.VOTOGETHER_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.VOTOGETHER_SERVER_REDIRECT_URL}`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <Wrapper>
      <LogoButton content="icon" style={{ width: '100px', height: '100px' }} />
      <ButtonWrapper>
        <KaKaoLoginImg
          alt="카카오 로그인"
          src={kakaoLogin}
          onClick={() => (window.location.href = kakaoURL)}
        />
        <SquareButton onClick={() => navigate('/')} theme="blank" style={{ height: '35px' }}>
          비회원으로 이용하기
        </SquareButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 150px;
  width: 320px;
  height: 1vh;
  margin-top: 300px;
  position: fixed;
  left: 10%;
  @media (min-width: 576px) {
    left: 30%;
  }
`;

const KaKaoLoginImg = styled.img`
  width: 255px;
  height: 35px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
  width: 230px;
`;
