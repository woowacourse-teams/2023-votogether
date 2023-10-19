import React from 'react';
import { Link } from 'react-router-dom';

import { BASE_PATH } from '@constants/path';

import kakaoLogin from '@assets/kakao_login.webp';
import bigKaKaoLogin from '@assets/kakao_login_large.webp';

import * as S from './style';

interface GuestProfileProps {
  isLargeKaKao?: boolean;
}

export default function GuestProfile({ isLargeKaKao = false }: GuestProfileProps) {
  return (
    <S.Container role="region" aria-label="비회원 프로필">
      <Link to={BASE_PATH.LOGIN}>
        <S.Image
          src={isLargeKaKao ? bigKaKaoLogin : kakaoLogin}
          alt="카카오 로그인 페이지로 이동"
        />
      </Link>
      <S.TextCard>로그인 후 이용할 수 있습니다</S.TextCard>
    </S.Container>
  );
}
