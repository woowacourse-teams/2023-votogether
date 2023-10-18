import { Suspense, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';

import ErrorBoundary from '@pages/ErrorBoundary';

import { PATH } from '@constants/path';

import arrowRight from '@assets/arrow-right.png';

import Skeleton from '../Skeleton';
import SquareButton from '../SquareButton';

import CategorySection from './CategorySection';
import GuestProfile from './GuestProfile';
import * as S from './style';
import UserProfile from './UserProfile';

export default function Dashboard() {
  const navigate = useNavigate();
  const { loggedInfo, clearLoggedInfo } = useContext(AuthContext);
  const { userInfo } = loggedInfo;

  const handleLogoutClick = () => {
    clearLoggedInfo();

    navigate('/');
  };

  return (
    <S.Container>
      <ErrorBoundary>
        {userInfo ? <UserProfile userInfo={userInfo} /> : <GuestProfile />}
      </ErrorBoundary>
      <S.NoticeListLink to={PATH.NOTICES}>
        <span>공지사항 보러가기</span>
        <S.Image src={arrowRight} alt="" />
      </S.NoticeListLink>
      <S.CategorySectionWrapper>
        <ErrorBoundary>
          <Suspense fallback={<Skeleton isLarge={true} />}>
            <CategorySection />
          </Suspense>
        </ErrorBoundary>
      </S.CategorySectionWrapper>
      {userInfo && (
        <S.ButtonWrapper>
          <SquareButton theme="blank" onClick={handleLogoutClick}>
            로그아웃
          </SquareButton>
        </S.ButtonWrapper>
      )}
    </S.Container>
  );
}
