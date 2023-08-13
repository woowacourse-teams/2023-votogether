import { useContext, ChangeEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';
import { useModifyUser } from '@hooks/query/user/useModifyUser';
import { useWithdrawalMembership } from '@hooks/query/user/useWithdrawalMembership';
import { useText } from '@hooks/useText';
import { useToggle } from '@hooks/useToggle';

import Accordion from '@components/common/Accordion';
import GuestProfile from '@components/common/Dashboard/GuestProfile';
import UserProfile from '@components/common/Dashboard/UserProfile';
import IconButton from '@components/common/IconButton';
import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';

import { PATH } from '@constants/path';
import { NICKNAME } from '@constants/user';

import { clearCookieToken } from '@utils/cookie';

import * as S from './style';

export default function MyInfo() {
  const navigate = useNavigate();

  const { mutate: modifyNickname } = useModifyUser();
  const { mutate: withdrawalMembership } = useWithdrawalMembership();

  const { isOpen, openComponent, closeComponent } = useToggle();
  const { loggedInfo, clearLoggedInfo } = useContext(AuthContext);
  const { text: newNickname, handleTextChange: handleNicknameChange } = useText(
    loggedInfo.userInfo?.nickname ?? ''
  );

  if (!loggedInfo.userInfo) {
    return <Navigate to={PATH.LOGIN} />;
  }

  const logout = () => {
    clearCookieToken('accessToken');
    clearLoggedInfo();
  };

  const handleModifyNickname = () => {
    modifyNickname(newNickname);
  };

  const handleWithdrawlMembership = () => {
    withdrawalMembership();
    logout();
  };

  return (
    <Layout isSidebarVisible={true}>
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
          {loggedInfo.userInfo ? <UserProfile userInfo={loggedInfo.userInfo} /> : <GuestProfile />}
        </S.ProfileSection>
        <S.UserControlSection>
          <Accordion title="닉네임 변경">
            <S.Input
              value={newNickname}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleNicknameChange(e, NICKNAME)}
              placeholder="새로운 닉네임을 입력해주세요"
            />
            <S.ButtonWrapper>
              <SquareButton aria-label="닉네임 변경" theme="fill" onClick={handleModifyNickname}>
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
                    <SquareButton
                      onClick={handleWithdrawlMembership}
                      aria-label="회원 탈퇴"
                      theme="fill"
                    >
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
    </Layout>
  );
}
