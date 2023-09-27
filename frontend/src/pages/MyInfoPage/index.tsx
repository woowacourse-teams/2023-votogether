import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToggle } from '@hooks';
import { useToast } from '@hooks';

import { AuthContext } from '@hooks/context/auth';
import { useModifyUser } from '@hooks/query/user/useModifyUser';
import { useWithdrawalMembership } from '@hooks/query/user/useWithdrawalMembership';

import Accordion from '@components/common/Accordion';
import GuestProfile from '@components/common/Dashboard/GuestProfile';
import UserProfile from '@components/common/Dashboard/UserProfile';
import Layout from '@components/common/Layout';
import SquareButton from '@components/common/SquareButton';
import Toast from '@components/common/Toast';

import { NICKNAME } from '@constants/policy';
import { NICKNAME_POLICY } from '@constants/policyMessage';

import InputNSubmitButton from '../../components/common/InputNSubmitButton';

import DeleteMemberModal from './DeleteMemberModal';
import * as S from './style';

export default function MyInfoPage() {
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

  const handleModifyNickname = (newNickname: string) => {
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
        <S.ProfileSection>
          {loggedInfo.userInfo ? <UserProfile userInfo={loggedInfo.userInfo} /> : <GuestProfile />}
        </S.ProfileSection>
        <S.UserControlSection>
          <Accordion title="닉네임 변경">
            <S.DescribeUl>
              <li>- {NICKNAME_POLICY.LETTER_AMOUNT}</li>
              <li>- {NICKNAME_POLICY.LIMIT_LETTER_TYPE}</li>
              <li>- {NICKNAME_POLICY.LIMIT_CHANGING}</li>
              <li>- {NICKNAME_POLICY.NO_DUPLICATION}</li>
              <li>- {NICKNAME_POLICY.LIMIT_KOREAN}</li>
            </S.DescribeUl>
            <InputNSubmitButton
              initText={loggedInfo.userInfo?.nickname}
              handleSubmit={handleModifyNickname}
              ariaLabel="닉네임"
              limitText={NICKNAME}
            />
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
