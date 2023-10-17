import Layout from '@components/common/Layout';
import SquareButton from '@components/common/SquareButton';
import NoticeList from '@components/notice/NoticeList';

import { MOCK_TRANSFORM_NOTICE_LIST } from '@mocks/mockData/notice';

import * as S from './style';

export default function NoticeListPage() {
  return (
    <Layout isSidebarVisible isChannelTalkVisible={false}>
      <S.Container>
        <S.Title tabIndex={0}>보투게더 소식</S.Title>
        <NoticeList noticeList={MOCK_TRANSFORM_NOTICE_LIST.noticeList} />
        <S.ButtonWrapper>
          <SquareButton theme="fill" aria-label="공지사항 더보기">
            더보기
          </SquareButton>
        </S.ButtonWrapper>
      </S.Container>
    </Layout>
  );
}
