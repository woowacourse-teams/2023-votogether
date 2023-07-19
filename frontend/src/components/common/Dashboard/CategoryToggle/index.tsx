import React, { useState } from 'react';

import { Category } from '@type/category';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';

import * as S from './style';

interface CategoryToggleProps {
  title: string;
  categoryList: Category[];
  handleFavoriteClick: (categoryId: number) => void;
  isInitialOpen?: boolean;
}

export default function CategoryToggle({
  title,
  categoryList,
  handleFavoriteClick,
  isInitialOpen = true,
}: CategoryToggleProps) {
  const [isToggleOpen, setIsToggleOpen] = useState(isInitialOpen);

  const handleToggleClick = () => {
    setIsToggleOpen(prevIsToggleOpen => !prevIsToggleOpen);
  };

  return (
    <S.Container>
      <S.TitleContainer
        onClick={handleToggleClick}
        aria-label={isToggleOpen ? `${title} 닫기` : `${title} 열기`}
        type="button"
      >
        <S.TriangleImage src={isToggleOpen ? chevronUp : chevronDown} alt="" />
        <span>{title}</span>
      </S.TitleContainer>
      {isToggleOpen && (
        <S.CategoryList>
          {categoryList.length === 0 && <S.Caption>현재 카테고리가 없습니다</S.Caption>}
          {categoryList.map(({ id, name, isFavorite }) => (
            <S.CategoryItem key={id}>
              <S.Circle
                title="즐겨찾기 버튼"
                onClick={() => handleFavoriteClick(id)}
                $isFavorite={isFavorite}
              />
              <S.CategoryName to={`/posts?categoryId=${id}`}>{name}</S.CategoryName>
            </S.CategoryItem>
          ))}
        </S.CategoryList>
      )}
    </S.Container>
  );
}
