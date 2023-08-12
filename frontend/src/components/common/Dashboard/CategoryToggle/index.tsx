import React, { useEffect, useState } from 'react';

import { Category } from '@type/category';

import { useCategoryFavoriteToggle } from '@hooks/query/category/useCategoryFavoriteToggle';
import { useToast } from '@hooks/useToast';

import Toast from '@components/common/Toast';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';

import * as S from './style';

interface CategoryToggleProps {
  title: string;
  categoryList: Category[];
  isInitialOpen?: boolean;
}

export default function CategoryToggle({
  title,
  categoryList,
  isInitialOpen = true,
}: CategoryToggleProps) {
  const [isToggleOpen, setIsToggleOpen] = useState(isInitialOpen);
  const { isToastOpen, openToast, toastMessage } = useToast();
  const { mutate, isError, error } = useCategoryFavoriteToggle();

  const handleToggleClick = () => {
    setIsToggleOpen(prevIsToggleOpen => !prevIsToggleOpen);
  };

  useEffect(() => {
    isError && error instanceof Error && openToast(error.message);
  }, [isError, error]);

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
                onClick={() => mutate({ id, isFavorite })}
                $isFavorite={isFavorite}
              />
              <S.CategoryNameLink to={`/posts/category/${id}`}>{name}</S.CategoryNameLink>
            </S.CategoryItem>
          ))}
        </S.CategoryList>
      )}
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </S.Container>
  );
}
