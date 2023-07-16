import React, { useState } from 'react';

import { Category } from '@type/category';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';

import * as S from './style';

interface CategoryToggleProps {
  title: string;
  categoryList: Category[];
  handleFavoriteClick: (categoryId: number) => void;
  initialOpen?: boolean;
}

export default function CategoryToggle({
  title,
  categoryList,
  handleFavoriteClick,
  initialOpen = true,
}: CategoryToggleProps) {
  const [isActive, setIsActive] = useState(initialOpen);

  const handleToggleClick = () => {
    setIsActive(prevIsActive => !prevIsActive);
  };
  return (
    <S.Container>
      <S.TitleContainer
        onClick={handleToggleClick}
        aria-label={isActive ? `${title} 닫기` : `${title} 열기`}
        type="button"
      >
        <S.Title>{title}</S.Title>
        <S.TriangleImage src={isActive ? chevronUp : chevronDown} alt="" />
      </S.TitleContainer>
      {isActive && (
        <S.CategoryList>
          {categoryList.length === 0 && (
            <S.Caption>선호하는 카테고리를 즐겨찾기 해보세요</S.Caption>
          )}
          {categoryList.map(category => (
            <S.CategoryItem key={category.id}>
              <S.Circle
                title="즐겨찾기 버튼"
                onClick={() => handleFavoriteClick(category.id)}
                $isFavorite={category.favorite}
              />
              <S.CategoryName to={`/posts?categoryId=${category.id}`}>
                {category.name}
              </S.CategoryName>
            </S.CategoryItem>
          ))}
        </S.CategoryList>
      )}
    </S.Container>
  );
}
