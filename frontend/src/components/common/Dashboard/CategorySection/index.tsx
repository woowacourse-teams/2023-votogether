import { useContext } from 'react';

import { PostOptionContext } from '@hooks';

import { AuthContext } from '@hooks/context/auth';
import { useCategoryList } from '@hooks/query/category/useCategoryList';

import CategoryToggle from '../CategoryToggle';

import * as S from './style';

export default function CategorySection() {
  const { loggedInfo } = useContext(AuthContext);
  const { postOption } = useContext(PostOptionContext);
  const { userInfo, isLoggedIn } = loggedInfo;

  const { data: categoryList } = useCategoryList(isLoggedIn);

  const categoryListFallback = categoryList ?? [];

  const favoriteCategory = categoryListFallback.filter(category => category.isFavorite === true);
  const allCategory = categoryListFallback.filter(category => category.isFavorite === false);

  return (
    <>
      <S.SelectedStateWrapper>
        <S.Circle />
        <S.SelectedStateText>{postOption.type}</S.SelectedStateText>
      </S.SelectedStateWrapper>
      <S.ContentContainer>
        <S.CategoryToggleContainer>
          {userInfo && <CategoryToggle title="즐겨찾기" categoryList={favoriteCategory} />}
          <CategoryToggle title="카테고리 모아보기" categoryList={allCategory} />
        </S.CategoryToggleContainer>
      </S.ContentContainer>
    </>
  );
}
