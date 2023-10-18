import { Suspense } from 'react';

import Layout from '@components/common/Layout';
import Skeleton from '@components/common/Skeleton';
import SquareButton from '@components/common/SquareButton';
import AdminNoticeTableFetcher from '@components/notice/AdminNoticeTableFetcher';

import { PATH } from '@constants/path';

import * as S from './style';

export default function NoticeAdminPage() {
  return (
    <Layout isSidebarVisible={false} isChannelTalkVisible={false}>
      <S.WriteContainer>
        <S.Title>관리자 공지사항 페이지</S.Title>
        <S.ButtonWrapper to={PATH.ADMIN_NOTICE_WRITE}>
          <SquareButton theme="fill">공지사항 작성하러 가기 </SquareButton>
        </S.ButtonWrapper>
      </S.WriteContainer>
      <Suspense fallback={<Skeleton isLarge />}>
        <AdminNoticeTableFetcher />
      </Suspense>
    </Layout>
  );
}
