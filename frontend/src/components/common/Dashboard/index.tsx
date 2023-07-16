import React from 'react';

import { Category } from '@type/category';
import { User } from '@type/user';

import SquareButton from '../SquareButton';

import CategoryToggle from './CategoryToggle';
import GuestProfile from './GuestProfile';
import * as S from './style';
import UserProfile from './UserProfile';

interface DashboardProps {
  categoryList: Category[];
  selectedCategory?: string;
  handleFavoriteClick: (categoryId: number) => void;
  handleLogoutClick: () => void;
  user?: User;
}

export default function Dashboard({
  user,
  categoryList,
  selectedCategory,
  handleFavoriteClick,
  handleLogoutClick,
}: DashboardProps) {
  const favoriteCategory = categoryList.filter(category => category.favorite === true);
  const allCategory = categoryList.filter(category => category.favorite === false);

  return (
    <S.Container>
      {user ? <UserProfile userInfo={user} /> : <GuestProfile />}
      <S.SelectCategoryWrapper>
        <S.Circle />
        <S.SelectCategoryText>{selectedCategory ? selectedCategory : '전체'}</S.SelectCategoryText>
      </S.SelectCategoryWrapper>
      <S.ContentContainer>
        <S.CategoryToggleContainer>
          {user && (
            <CategoryToggle
              title="즐겨찾기"
              categoryList={favoriteCategory}
              handleFavoriteClick={handleFavoriteClick}
            />
          )}
          <CategoryToggle
            title="카테고리 모아보기"
            categoryList={allCategory}
            handleFavoriteClick={handleFavoriteClick}
          />
        </S.CategoryToggleContainer>
      </S.ContentContainer>
      {user && (
        <S.ButtonWrapper>
          <SquareButton theme="blank" onClick={handleLogoutClick}>
            로그아웃
          </SquareButton>
        </S.ButtonWrapper>
      )}
    </S.Container>
  );
}
