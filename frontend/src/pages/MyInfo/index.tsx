import { useNavigate } from 'react-router-dom';

import { User } from '@type/user';

import { useToggle } from '@hooks/useToggle';

import Accordion from '@components/common/Accordion';
import UserProfile from '@components/common/Dashboard/UserProfile';
import IconButton from '@components/common/IconButton';
import Modal from '@components/common/Modal';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';

import * as S from './style';

export default function MyInfo() {
  const navigate = useNavigate();
  const { isOpen, openComponent, closeComponent } = useToggle();

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
          <S.ButtonWrapper>
            <SquareButton onClick={openComponent} aria-label="회원 탈퇴" theme="blank">
              회원 탈퇴
            </SquareButton>
          </S.ButtonWrapper>
          {isOpen && (
            <Modal size="sm" onModalClose={closeComponent}>
              <S.ModalBody>
                <S.ModalTitle>정말 탈퇴하시겠어요?</S.ModalTitle>
                <S.ModalDescription>
                  탈퇴 버튼 클릭 시, <br></br>계정은 삭제되며 복구되지 않아요.
                </S.ModalDescription>
                <S.ButtonListWrapper>
                  <SquareButton aria-label="회원 탈퇴" theme="fill">
                    탈퇴
                  </SquareButton>
                  <SquareButton onClick={closeComponent} aria-label="회원 탈퇴" theme="blank">
                    취소
                  </SquareButton>
                </S.ButtonListWrapper>
              </S.ModalBody>
            </Modal>
          )}
        </Accordion>
      </S.UserControlSection>
    </S.Wrapper>
  );
}
