import Layout from '@components/common/Layout';
import SquareButton from '@components/common/SquareButton';
import NoticeList from '@components/notice/NoticeList';

import * as S from './style';

export default function NoticeListPage() {
  const MOCK_NOTICE_LIST = [
    {
      id: 1,
      title: '방방뛰는 코끼리 엄청나게 긴 게시글 공지사항입니다.',
      createdAt: '2022-01-11 12:23',
    },
    {
      id: 2,
      title: '방방뛰는 코끼리',
      createdAt: '2022-01-11 12:23',
    },
    {
      id: 3,
      title: '방방뛰는 코끼리',
      createdAt: '2022-01-11 12:23',
    },
    {
      id: 4,
      title: '방방뛰는 코끼리',
      createdAt: '2022-01-11 12:23',
    },
    {
      id: 5,
      title: '방방뛰는 코끼리',
      createdAt: '2022-01-11 12:23',
    },
    {
      id: 6,
      title: '방방뛰는 코끼리 엄청나게 긴 게시글 공지사항입니다.',
      createdAt: '2022-01-11 12:23',
    },
    {
      id: 7,
      title: '방방뛰는 코끼리',
      createdAt: '2022-01-11 12:23',
    },
    {
      id: 8,
      title: '방방뛰는 코끼리',
      createdAt: '2022-01-11 12:23',
    },
    {
      id: 9,
      title: '방방뛰는 코끼리',
      createdAt: '2022-01-11 12:23',
    },
    {
      id: 10,
      title: '방방뛰는 코끼리',
      createdAt: '2022-01-11 12:23',
    },
    {
      id: 11,
      title: '방방뛰는 코끼리 엄청나게 긴 게시글 공지사항입니다.',
      createdAt: '2022-01-11 12:23',
    },
  ];

  return (
    <Layout isSidebarVisible>
      <S.Container>
        <S.Title>보투게더 소식</S.Title>
        <NoticeList noticeList={MOCK_NOTICE_LIST} />
        <S.ButtonWrapper>
          <SquareButton theme="fill" aria-label="공지사항 더보기">
            더보기
          </SquareButton>
        </S.ButtonWrapper>
      </S.Container>
    </Layout>
  );
}
