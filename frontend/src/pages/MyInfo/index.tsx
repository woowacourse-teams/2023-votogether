import { useContext, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';
import { useModifyUser } from '@hooks/query/user/useModifyUser';
import { useWithdrawalMembership } from '@hooks/query/user/useWithdrawalMembership';
import { useText } from '@hooks/useText';
import { useToast } from '@hooks/useToast';
import { useToggle } from '@hooks/useToggle';

import Accordion from '@components/common/Accordion';
import GuestProfile from '@components/common/Dashboard/GuestProfile';
import UserProfile from '@components/common/Dashboard/UserProfile';
import IconButton from '@components/common/IconButton';
import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';
import Toast from '@components/common/Toast';

import { NICKNAME_POLICY } from '@constants/policyMessage';
import { NICKNAME } from '@constants/user';

import DeleteMemberModal from './DeleteMemberModal';
import * as S from './style';

export default function MyInfo() {
  const navigate = useNavigate();

  const {
    mutate: modifyNickname,
    isSuccess: isModifyNicknameSuccess,
    isError: isModifyNicknameError,
    error: modifyNicknameError,
  } = useModifyUser();
  const {
    mutate: withdrawalMembership,
    isSuccess: isWithdrawalMembershipSuccess,
    isError: isWithdrawalMembershipError,
    error: withdrawalMembershipError,
  } = useWithdrawalMembership();

  const { isToastOpen, openToast, toastMessage } = useToast();

  const { isOpen, openComponent, closeComponent } = useToggle();
  const { loggedInfo, clearLoggedInfo } = useContext(AuthContext);
  const { text: newNickname, handleTextChange: handleNicknameChange } = useText(
    loggedInfo.userInfo?.nickname ?? ''
  );

  const handleModifyNickname = () => {
    modifyNickname(newNickname);
  };

  const handleWithdrawalMembership = () => {
    withdrawalMembership();
  };

  useEffect(() => {
    if (isModifyNicknameSuccess) {
      openToast('닉네임을 성공적으로 변경했습니다.');
      return;
    }
  }, [isModifyNicknameSuccess]);

  useEffect(() => {
    if (isModifyNicknameError && modifyNicknameError instanceof Error) {
      const errorResponse = JSON.parse(modifyNicknameError.message);
      openToast(errorResponse.message);
      return;
    }
  }, [isModifyNicknameError, modifyNicknameError]);

  useEffect(() => {
    if (isWithdrawalMembershipSuccess) {
      clearLoggedInfo();

      navigate('/');
    }
  }, [isWithdrawalMembershipSuccess]);

  useEffect(() => {
    if (isWithdrawalMembershipError && withdrawalMembershipError instanceof Error) {
      const errorResponse = JSON.parse(withdrawalMembershipError.message);
      openToast(errorResponse.message);
      return;
    }
  }, [isWithdrawalMembershipError, withdrawalMembershipError]);

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
            <S.DescribeUl>
              <li>- {NICKNAME_POLICY.LETTER_AMOUNT}</li>
              <li>- {NICKNAME_POLICY.LIMIT_LETTER_TYPE}</li>
              <li>- {NICKNAME_POLICY.NO_DUPLICATION}</li>
            </S.DescribeUl>
            <S.InputWrapper>
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
            </S.InputWrapper>
          </Accordion>
          <Accordion title="회원 탈퇴">
            <S.ButtonWrapper>
              <SquareButton onClick={openComponent} aria-label="회원 탈퇴" theme="blank">
                회원 탈퇴
              </SquareButton>
            </S.ButtonWrapper>
            {isOpen && (
              <DeleteMemberModal
                handleModalClose={closeComponent}
                handleWithdrawalMembership={handleWithdrawalMembership}
              />
            )}
          </Accordion>
        </S.UserControlSection>
        {isToastOpen && (
          <Toast size="md" position="bottom">
            {toastMessage}
          </Toast>
        )}
      </S.Wrapper>
    </Layout>
  );
}
