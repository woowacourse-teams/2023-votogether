import React, { useState } from 'react';

import { Category } from '@type/category';

import triangleIcon from '@assets/triangle.svg';

import * as S from './style';

interface CategoryToggleProps {
  title: string;
  categories: Category[];
  handleFavoriteClick: (categoryId: number) => void;
  initialOpen?: boolean;
}

export default function CategoryToggle({
  title,
  categories,
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
        <S.TriangleImage src={triangleIcon} alt="" />
        <S.Title>{title}</S.Title>
      </S.TitleContainer>
      {isActive && (
        <S.CategoryList>
          {categories.map(category => (
            <S.CategoryItem key={category.id}>
              <S.Circle title="즐겨찾기 버튼" onClick={() => handleFavoriteClick(category.id)} />
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
