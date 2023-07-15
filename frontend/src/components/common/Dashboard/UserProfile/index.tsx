import React from 'react';

import { BASE_PATH } from '@constants/path';

import { User } from '@type/user';

import * as S from './style';

interface UserProfileProps {
  userInfo: User;
}

export default function UserProfile({ userInfo }: UserProfileProps) {
  const { nickname, userPoint, postCount, voteCount, badge } = userInfo;

  return (
    <S.Container>
      {badge && <S.Badge>[{badge}]</S.Badge>}
      <S.NickName>{nickname}</S.NickName>
      <S.UserInfoContainer>
        <S.TextCardContainer>
          <S.TextCardTitle>포인트</S.TextCardTitle>
          <S.TextCardContent>{userPoint}</S.TextCardContent>
        </S.TextCardContainer>
        <S.TextCardLink to={`/${BASE_PATH.USER}/posts`}>
          <S.TextCardTitle>작성글</S.TextCardTitle>
          <S.TextCardContent>{postCount}</S.TextCardContent>
        </S.TextCardLink>
        <S.TextCardLink to={`/${BASE_PATH.USER}/votes`}>
          <S.TextCardTitle>투표수</S.TextCardTitle>
          <S.TextCardContent>{voteCount}</S.TextCardContent>
        </S.TextCardLink>
      </S.UserInfoContainer>
    </S.Container>
  );
}
