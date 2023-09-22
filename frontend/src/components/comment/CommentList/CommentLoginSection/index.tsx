import { PATH } from '@constants/path';

import kakaoLogin from '@assets/kakao_login_large.webp';

import * as S from './style';

interface CommentLoginSectionProps {
  name: string;
}

export default function CommentLoginSectionSection({ name }: CommentLoginSectionProps) {
  return (
    <S.Container>
      <S.Title>대화에 참여하려면 회원가입</S.Title>
      <S.SubTitle>로그인하여 {name}님의 이야기에 대해 피드백을 제공해 보세요</S.SubTitle>
      <S.LoginLink to={PATH.LOGIN} aria-label="카카오 로그인 페이지로 이동">
        <S.Image src={kakaoLogin} alt="로그인 페이지로" />
      </S.LoginLink>
    </S.Container>
  );
}
