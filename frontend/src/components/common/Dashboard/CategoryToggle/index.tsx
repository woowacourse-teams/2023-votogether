import React, { useContext, useState } from 'react';

import { Category } from '@type/category';

import { AuthContext } from '@hooks/context/auth';
import { ToastContext } from '@hooks/context/toast';
import { useCategoryFavoriteToggle } from '@hooks/query/category/useCategoryFavoriteToggle';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';
import starFilled from '@assets/star-filled.svg';
import startLined from '@assets/star-lined.svg';

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
  const { mutate } = useCategoryFavoriteToggle();

  const { loggedInfo } = useContext(AuthContext);
  const { addMessage } = useContext(ToastContext);

  const handleToggleClick = () => {
    setIsToggleOpen(prevIsToggleOpen => !prevIsToggleOpen);
  };

  const handleFavoriteCategoryClick = (categoryId: number, isFavorite: boolean) => {
    if (!loggedInfo.isLoggedIn) {
      addMessage('즐겨찾기는 로그인 후 이용할 수 있습니다.');
      return;
    }

    mutate({ id: categoryId, isFavorite });
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
                onClick={() => handleFavoriteCategoryClick(id, isFavorite)}
              >
                <img src={isFavorite ? starFilled : startLined} alt="" />
              </S.Circle>
              <S.CategoryNameLink to={`/posts/category/${id}`}>{name}</S.CategoryNameLink>
            </S.CategoryItem>
          ))}
        </S.CategoryList>
      )}
    </S.Container>
  );
}
