import React from 'react';
import { useLocation } from 'react-router-dom';

import { User } from '@type/user';

import { PATH } from '@constants/path';

import * as PS from '../profileStyle';

import * as S from './style';

interface UserProfileProps {
  userInfo: User;
}

export default function UserProfile({ userInfo }: UserProfileProps) {
  const { nickname, postCount, voteCount } = userInfo;
  const { pathname } = useLocation();

  return (
    <PS.ProfileContainer role="region" aria-label="회원 프로필">
      {pathname === PATH.USER_INFO ? (
        <S.NickName>{nickname}</S.NickName>
      ) : (
        <S.TextCardLink to={PATH.USER_INFO} aria-label="닉네임을 클릭하면 마이페이지로 이동합니다.">
          <S.NickName>{nickname}</S.NickName>
        </S.TextCardLink>
      )}
      <S.UserInfoContainer>
        <S.TextCardLink to={PATH.USER_POST}>
          <S.TextCardTitle>작성글</S.TextCardTitle>
          <S.TextCardContent>{postCount}</S.TextCardContent>
        </S.TextCardLink>
        <S.TextCardLink to={PATH.USER_VOTE}>
          <S.TextCardTitle>투표수</S.TextCardTitle>
          <S.TextCardContent>{voteCount}</S.TextCardContent>
        </S.TextCardLink>
      </S.UserInfoContainer>
    </PS.ProfileContainer>
  );
}
