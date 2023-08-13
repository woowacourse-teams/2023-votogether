import { Suspense, useContext } from 'react';

import { AuthContext } from '@hooks/context/auth';

import ErrorBoundary from '@pages/ErrorBoundary';

import { clearCookieToken } from '@utils/cookie';

import Skeleton from '../Skeleton';
import SquareButton from '../SquareButton';

import CategorySection from './CategorySection';
import GuestProfile from './GuestProfile';
import * as S from './style';
import UserProfile from './UserProfile';

export default function Dashboard() {
  const { loggedInfo, clearLoggedInfo } = useContext(AuthContext);
  const { userInfo } = loggedInfo;

  const handleLogoutClick = () => {
    clearCookieToken('accessToken');
    clearLoggedInfo();
  };

  return (
    <S.Container>
      {userInfo ? <UserProfile userInfo={userInfo} /> : <GuestProfile />}
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
