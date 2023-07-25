import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import Dashboard from '@components/common/Dashboard';
import WideHeader from '@components/common/WideHeader';

import { MOCK_FAVORITE_CATEGORIES } from '@mocks/mockData/category';

import * as S from './style';

interface LayoutProps extends PropsWithChildren {
  isSidebarVisible: boolean;
}

export default function Layout({ children, isSidebarVisible }: LayoutProps) {
  const navigate = useNavigate();

  //추후 구현 예정
  const userInfo = undefined;
  const categoryList = MOCK_FAVORITE_CATEGORIES;
  const selectedCategory = undefined;
  const handleFavoriteClick = () => {};
  const handleLogoutClick = () => {};

  const movePostListPage = () => {
    navigate('/');
  };

  return (
    <S.Container>
      <S.WideHeaderWrapper>
        <WideHeader clickLogo={movePostListPage} />
      </S.WideHeaderWrapper>
      <S.ContentContainer>
        {isSidebarVisible && (
          <S.DashboardWrapper>
            <Dashboard
              userInfo={userInfo}
              categoryList={categoryList}
              selectedCategory={selectedCategory}
              handleFavoriteClick={handleFavoriteClick}
              handleLogoutClick={handleLogoutClick}
            />
          </S.DashboardWrapper>
        )}
        <S.MainContainer $isSidebarVisible={isSidebarVisible}>
          <S.ChildrenWrapper $isSidebarVisible={isSidebarVisible}>{children}</S.ChildrenWrapper>
        </S.MainContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
