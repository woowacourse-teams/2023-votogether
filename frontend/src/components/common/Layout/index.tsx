import { PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';
import { useCategoryList } from '@hooks/query/category/useCategoryList';
import { usePostRequestInfo } from '@hooks/usePostRequestInfo';

import Dashboard from '@components/common/Dashboard';
import WideHeader from '@components/common/WideHeader';

import { clearCookieToken } from '@utils/cookie';
import { getSelectedState } from '@utils/post/getSelectedState';

import * as S from './style';

interface LayoutProps extends PropsWithChildren {
  isSidebarVisible: boolean;
}

export default function Layout({ children, isSidebarVisible }: LayoutProps) {
  const navigate = useNavigate();

  const { loggedInfo, clearLoggedInfo } = useContext(AuthContext);

  const { data: categoryList } = useCategoryList(loggedInfo.isLoggedIn);
  const { postOptionalOption, postType } = usePostRequestInfo();
  const { categoryId, keyword } = postOptionalOption;

  const selectedState = getSelectedState({
    categoryId,
    keyword,
    categoryList: categoryList ?? [],
    postType,
  });

  const handleLogoutClick = () => {
    clearCookieToken('accessToken');
    clearLoggedInfo();
  };

  const movePostListPage = () => {
    navigate('/');
  };

  return (
    <S.Container>
      <S.WideHeaderWrapper>
        <WideHeader handleLogoClick={movePostListPage} />
      </S.WideHeaderWrapper>
      <S.ContentContainer>
        {isSidebarVisible && (
          <S.DashboardWrapper>
            <Dashboard
              userInfo={loggedInfo.userInfo}
              categoryList={categoryList ?? []}
              selectedState={selectedState}
              handleLogoutClick={handleLogoutClick}
            />
          </S.DashboardWrapper>
        )}
        <S.MainContainer $isSidebarVisible={isSidebarVisible}>
          <S.ChildrenWrapper $isSidebarVisible={isSidebarVisible}>{children}</S.ChildrenWrapper>
        </S.MainContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
