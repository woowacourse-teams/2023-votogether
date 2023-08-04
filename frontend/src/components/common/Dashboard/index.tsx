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
  handleLogoutClick: () => void;
  userInfo?: User;
}

export default function Dashboard({
  userInfo,
  categoryList,
  selectedCategory = '전체',
  handleLogoutClick,
}: DashboardProps) {
  const favoriteCategory = categoryList.filter(category => category.isFavorite === true);
  const allCategory = categoryList.filter(category => category.isFavorite === false);

  return (
    <S.Container>
      {userInfo ? <UserProfile userInfo={userInfo} /> : <GuestProfile />}
      <S.SelectCategoryWrapper>
        <S.Circle />
        <S.SelectCategoryText>{selectedCategory}</S.SelectCategoryText>
      </S.SelectCategoryWrapper>
      <S.ContentContainer>
        <S.CategoryToggleContainer>
          {userInfo && <CategoryToggle title="즐겨찾기" categoryList={favoriteCategory} />}
          <CategoryToggle title="카테고리 모아보기" categoryList={allCategory} />
        </S.CategoryToggleContainer>
      </S.ContentContainer>
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
