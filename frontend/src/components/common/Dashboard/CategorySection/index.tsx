import { useContext } from 'react';

import { AuthContext } from '@hooks/context/auth';
import { useCategoryList } from '@hooks/query/category/useCategoryList';
import { usePostRequestInfo } from '@hooks/usePostRequestInfo';

import { getSelectedState } from '@utils/post/getSelectedState';

import CategoryToggle from '../CategoryToggle';

import * as S from './style';

export default function CategorySection() {
  const { loggedInfo } = useContext(AuthContext);
  const { userInfo, isLoggedIn } = loggedInfo;

  const { data: categoryList } = useCategoryList(isLoggedIn);

  const { postOptionalOption, postType } = usePostRequestInfo();
  const { categoryId, keyword } = postOptionalOption;

  const selectedState = getSelectedState({
    categoryId,
    keyword,
    categoryList: categoryList ?? [],
    postType,
  });

  const favoriteCategory = categoryList?.filter(category => category.isFavorite === true) ?? [];
  const allCategory = categoryList?.filter(category => category.isFavorite === false) ?? [];

  return (
    <>
      <S.SelectCategoryWrapper>
        <S.Circle />
        <S.SelectCategoryText>{selectedState}</S.SelectCategoryText>
      </S.SelectCategoryWrapper>
      <S.ContentContainer>
        <S.CategoryToggleContainer>
          {userInfo && <CategoryToggle title="즐겨찾기" categoryList={favoriteCategory} />}
          <CategoryToggle title="카테고리 모아보기" categoryList={allCategory} />
        </S.CategoryToggleContainer>
      </S.ContentContainer>
    </>
  );
}
