import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '@hooks';

import { PATH } from '@constants/path';

export default function AdminRoute({ children }: PropsWithChildren) {
  const {
    loggedInfo: { userInfo },
  } = useContext(AuthContext);

  if (userInfo?.role !== 'ADMIN') {
    alert('해당 페이지는 관리자만 접근이 가능합니다.');

    return <Navigate to={PATH.LOGIN} />;
  }

  return children;
}
