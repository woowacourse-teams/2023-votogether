import { PropsWithChildren, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import ErrorBoundary from '@pages/ErrorBoundary';

import Dashboard from '@components/common/Dashboard';
import WideHeader from '@components/common/WideHeader';

import Skeleton from '../Skeleton';

import * as S from './style';

interface LayoutProps extends PropsWithChildren {
  isSidebarVisible: boolean;
}

export default function Layout({ children, isSidebarVisible }: LayoutProps) {
  const navigate = useNavigate();

  const movePostListPage = () => {
    navigate('/');
  };

  return (
    <S.Container>
      <S.WideHeaderWrapper>
        <WideHeader handleLogoClick={movePostListPage} />
      </S.WideHeaderWrapper>
      <S.ContentContainer>
        {isSidebarVisible && (
          <S.DashboardWrapper>
            <ErrorBoundary>
              <Suspense fallback={<Skeleton />}>
                <Dashboard />
              </Suspense>
            </ErrorBoundary>
          </S.DashboardWrapper>
        )}
        <S.MainContainer $isSidebarVisible={isSidebarVisible}>
          <S.ChildrenWrapper $isSidebarVisible={isSidebarVisible}>{children}</S.ChildrenWrapper>
        </S.MainContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
