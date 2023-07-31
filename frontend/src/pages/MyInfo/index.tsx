import { useNavigate } from 'react-router-dom';

import { User } from '@type/user';

import Accordion from '@components/common/Accordion';
import UserProfile from '@components/common/Dashboard/UserProfile';
import IconButton from '@components/common/IconButton';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';

import * as S from './style';

export default function MyInfo() {
  const navigate = useNavigate();

  // const { data: userInfo, error, isLoading, isError } = useUserInfo(); // 유저 정보 조회 관련 pr merge 필요
  const MOCK_USER_INFO: User = {
    nickname: '우아한 코끼리',
    postCount: 4,
    voteCount: 128,
    userPoint: 200,
  };

  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <NarrowTemplateHeader>
          <IconButton
            category="back"
            onClick={() => {
              navigate(-1);
            }}
          />
        </NarrowTemplateHeader>
      </S.HeaderWrapper>
      <S.ProfileSection>
        <UserProfile userInfo={MOCK_USER_INFO} />
      </S.ProfileSection>
      <S.UserControlSection>
        <Accordion title="닉네임 변경">
          <S.Input placeholder="새로운 닉네임을 입력해주세요" />
          <S.ButtonWrapper>
            <SquareButton aria-label="닉네임 변경" theme="fill">
              변경
            </SquareButton>
          </S.ButtonWrapper>
        </Accordion>
        <Accordion title="회원 탈퇴">
          <S.Input placeholder="비밀번호를 입력해주세요" />
          <S.ButtonWrapper>
            <SquareButton aria-label="회원 탈퇴" theme="fill">
              회원 탈퇴
            </SquareButton>
          </S.ButtonWrapper>
        </Accordion>
      </S.UserControlSection>
    </S.Wrapper>
  );
}
