import React from 'react';
import { Link } from 'react-router-dom';

import { BASE_PATH } from '@constants/path';

import kakaoLogin from '@assets/kakao_login.svg';

import * as S from './style';

export default function GuestProfile() {
  return (
    <S.Container>
      <Link to={BASE_PATH.LOGIN}>
        <S.Image src={kakaoLogin} alt="로그인 페이지로 이동" />
      </Link>
      <S.TextCard>로그인 후 이용할 수 있습니다</S.TextCard>
    </S.Container>
  );
}
