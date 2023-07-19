import React, { PropsWithChildren } from 'react';

import type { Category } from '@type/category';
import type { User } from '@type/user';

import Dashboard from '@components/common/Dashboard';
import WideHeader from '@components/common/WideHeader';

import * as S from './style';

interface LayoutProps extends PropsWithChildren {
  userInfo?: User;
  categoryList: Category[];
  selectedCategory?: string;
  isVisibleCategory: boolean;
  handleFavoriteClick: (categoryId: number) => void;
  handleLogoutClick: () => void;
}

export default function Layout({
  userInfo,
  categoryList,
  selectedCategory,
  isVisibleCategory,
  handleFavoriteClick,
  handleLogoutClick,
  children,
}: LayoutProps) {
  return (
    <S.Container>
      <S.WideHeaderWrapper>
        <WideHeader />
      </S.WideHeaderWrapper>
      <S.ContentContainer>
        {isVisibleCategory && (
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
        <S.MainContainer $isVisibleCategory={isVisibleCategory}>
          <S.ChildrenWrapper $isVisibleCategory={isVisibleCategory}>{children}</S.ChildrenWrapper>
        </S.MainContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
