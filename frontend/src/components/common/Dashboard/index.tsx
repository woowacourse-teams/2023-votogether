import { useContext } from 'react';

import { AuthContext } from '@hooks/context/auth';
import { useCategoryList } from '@hooks/query/category/useCategoryList';

import { clearCookieToken } from '@utils/cookie';

import SquareButton from '../SquareButton';

import CategoryToggle from './CategoryToggle';
import GuestProfile from './GuestProfile';
import * as S from './style';
import UserProfile from './UserProfile';

export default function Dashboard() {
  const { loggedInfo, clearLoggedInfo } = useContext(AuthContext);
  const { userInfo, isLoggedIn } = loggedInfo;

  const { data: categoryList } = useCategoryList(isLoggedIn);

  const handleLogoutClick = () => {
    clearCookieToken('accessToken');
    clearLoggedInfo();
  };

  const selectedState = '전체';

  const favoriteCategory = categoryList?.filter(category => category.isFavorite === true) ?? [];
  const allCategory = categoryList?.filter(category => category.isFavorite === false) ?? [];

  return (
    <S.Container>
      {userInfo ? <UserProfile userInfo={userInfo} /> : <GuestProfile />}
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
