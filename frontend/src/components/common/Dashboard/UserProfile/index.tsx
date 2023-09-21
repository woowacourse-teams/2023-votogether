import { User } from '@type/user';

import { PATH } from '@constants/path';

import arrowRight from '@assets/arrow-right.png';

import * as PS from '../profileStyle';

import * as S from './style';
interface UserProfileProps {
  userInfo: User;
}

export default function UserProfile({ userInfo }: UserProfileProps) {
  const { nickname, postCount, voteCount } = userInfo;

  return (
    <PS.ProfileContainer role="region" aria-label="회원 프로필">
      <S.NickName>{nickname}</S.NickName>
      <S.UserInfoContainer>
        <S.TextCardLink to={PATH.USER_POST}>
          <S.TextCardTitle>작성글</S.TextCardTitle>
          <S.TextCardContent>
            {postCount}
            <S.Img src={arrowRight} alt="작성글 페이지 이동 화살표" />
          </S.TextCardContent>
        </S.TextCardLink>
        <S.TextCardLink to={PATH.USER_VOTE}>
          <S.TextCardTitle>투표수</S.TextCardTitle>
          <S.TextCardContent>
            {voteCount} <S.Img src={arrowRight} alt="투표글 페이지 이동 화살표" />
          </S.TextCardContent>
        </S.TextCardLink>
      </S.UserInfoContainer>
    </PS.ProfileContainer>
  );
}
