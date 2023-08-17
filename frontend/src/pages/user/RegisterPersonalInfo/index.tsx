import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateUserInfo } from '@api/userInfo';

import Accordion from '@components/common/Accordion';
import IconButton from '@components/common/IconButton';
import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';

import { BIRTH_YEAR } from '@constants/user';

import { setCookieToken } from '@utils/cookie';

import * as S from './style';

interface UserInfoForm {
  gender: '';
  birthYear: string;
  isTermsAgreed: boolean;
}

export default function RegisterPersonalInfo() {
  const navigate = useNavigate();

  const [userInfoForm, setUserInfoForm] = useState<UserInfoForm>({
    gender: '',
    birthYear: '',
    isTermsAgreed: false,
  });

  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value;

    setUserInfoForm(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleUserInfoFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { gender, birthYear, isTermsAgreed } = userInfoForm;

    if (!gender || !birthYear) {
      alert('필수 개인 정보를 모두 입력해주세요.');
      return;
    }

    if (isNaN(Number(birthYear))) {
      alert('생년월일 값을 확인해주세요.');
      return;
    }

    if (!isTermsAgreed) {
      alert('개인 정보 약관에 동의해주세요.');
      return;
    }

    const submittedUserInfo = { gender, birthYear: Number(birthYear) };
    updateUserInfo(submittedUserInfo);
    setCookieToken('hasEssentialInfo', true);

    alert('개인 정보 등록 완료!');
    navigate('/');
  };

  return (
    <Layout isSidebarVisible={true}>
      <S.Wrapper>
        <S.HeaderWrapper>
          <NarrowTemplateHeader>
            <IconButton category="back" />
          </NarrowTemplateHeader>
        </S.HeaderWrapper>
        <S.Title>개인 정보 등록</S.Title>
        <S.MainWrapper>
          <S.InfoForm onSubmit={handleUserInfoFormSubmit}>
            <Accordion title="개인정보 수집 약관 및 동의">
              <S.TermsList>
                <li>• 개인정보 항목: 성별, 나이</li>
                <li>• 수집 방법: 회원가입 후 개인정보 등록 페이지에서 성별, 나이 저장</li>
                <li>
                  • 수집 목적: 투표한 이용자의 성별 및 나이에 대한 투표 통계 제공 (단, 투표 통계는
                  글 작성자에 한하여 제공됨)
                </li>
                <li>• 보유 근거: 정보주체 동의</li>
                <li>• 보유 기간: 회원 탈퇴 시 즉시 삭제</li>
                <p>
                  * 개인 정보 수집에 대한 동의를 거부할 수 있습니다. (단, 동의가 없을 경우 일부
                  서비스 이용에 제한이 있습니다.)
                </p>
              </S.TermsList>
            </Accordion>
            <S.Label>
              <p>성별</p>
              <S.GenderLabel>
                <S.Label>
                  <S.Radio
                    type="radio"
                    name="gender"
                    value="MALE"
                    onChange={handleFormInputChange}
                  />
                  남성
                </S.Label>
                <S.Label>
                  <S.Radio
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    onChange={handleFormInputChange}
                  />
                  여성
                </S.Label>
              </S.GenderLabel>
            </S.Label>
            <S.Label>
              <p>출생 연도</p>
              <S.Input
                type="number"
                value={userInfoForm.birthYear}
                name="birthYear"
                onChange={handleFormInputChange}
                placeholder="출생 연도를 입력해주세요"
                size={4}
                min={BIRTH_YEAR.MIN_LENGTH}
                max={BIRTH_YEAR.MAX_LENGTH}
              />
            </S.Label>
            <S.Label>
              <S.Checkbox
                type="checkbox"
                name="isTermsAgreed"
                checked={userInfoForm.isTermsAgreed}
                onChange={handleFormInputChange}
              />
              개인 정보 약관에 동의합니다.
            </S.Label>
            <S.ButtonWrapper>
              <SquareButton type="submit" aria-label="사용자 개인 정보 저장" theme="fill">
                저장
              </SquareButton>
            </S.ButtonWrapper>
          </S.InfoForm>
        </S.MainWrapper>
      </S.Wrapper>
    </Layout>
  );
}
