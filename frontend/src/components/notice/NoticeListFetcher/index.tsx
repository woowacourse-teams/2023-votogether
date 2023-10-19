import { Notice, NoticeListType } from '@type/notice';

import { useStackedNoticeList } from '@hooks';

import SquareButton from '@components/common/SquareButton';

import NoticeList from '../NoticeList';

import * as S from './style';

export default function NoticeListFetcher() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useStackedNoticeList();

  const noticeList = data?.pages.reduce((accumulator: Notice[], currentValue: NoticeListType) => {
    return [...accumulator, ...currentValue.noticeList];
  }, []);

  const handleNextFetchClick = () => {
    if (isFetchingNextPage) return;

    fetchNextPage();
  };

  if (!noticeList) return <></>;

  return (
    <>
      <NoticeList noticeList={noticeList} />
      {hasNextPage && (
        <S.ButtonWrapper onClick={handleNextFetchClick}>
          <SquareButton
            disabled={isFetchingNextPage}
            theme={isFetchingNextPage ? 'gray' : 'fill'}
            aria-label="공지사항 더보기"
          >
            더보기
          </SquareButton>
        </S.ButtonWrapper>
      )}
    </>
  );
}
