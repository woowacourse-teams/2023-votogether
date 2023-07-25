import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Category } from '@type/category';
import type { User } from '@type/user';

import Dashboard from '@components/common/Dashboard';
import WideHeader from '@components/common/WideHeader';

import * as S from './style';

interface LayoutProps extends PropsWithChildren {
  userInfo?: User;
  categoryList: Category[];
  selectedCategory?: string;
  isSidebarVisible: boolean;
  handleFavoriteClick: (categoryId: number) => void;
  handleLogoutClick: () => void;
}

export default function Layout({
  userInfo,
  categoryList,
  selectedCategory,
  isSidebarVisible,
  handleFavoriteClick,
  handleLogoutClick,
  children,
}: LayoutProps) {
  const navigate = useNavigate();

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
