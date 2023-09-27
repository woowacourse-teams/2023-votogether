import { useContext } from 'react';

import { AuthContext } from '@hooks/context/auth';
import { useCategoryList } from '@hooks/query/category/useCategoryList';
import { usePostRequestInfo } from '@hooks/usePostRequestInfo';

import { getSelectedPostListState } from '@utils/post/getSelectedPostListState';

import CategoryToggle from '../CategoryToggle';

import * as S from './style';

export default function CategorySection() {
  const { loggedInfo } = useContext(AuthContext);
  const { userInfo, isLoggedIn } = loggedInfo;

  const { data: categoryList } = useCategoryList(isLoggedIn);

  const categoryListFallback = categoryList ?? [];

  const { postOptionalOption, postType } = usePostRequestInfo();
  const { categoryId } = postOptionalOption;

  const selectedState = getSelectedPostListState({
    categoryId,
    categoryList: categoryListFallback,
    postType,
  });

  const favoriteCategory = categoryListFallback.filter(category => category.isFavorite === true);
  const allCategory = categoryListFallback.filter(category => category.isFavorite === false);

  return (
    <>
      <S.SelectedStateWrapper>
        <S.Circle />
        <S.SelectedStateText>{selectedState}</S.SelectedStateText>
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
