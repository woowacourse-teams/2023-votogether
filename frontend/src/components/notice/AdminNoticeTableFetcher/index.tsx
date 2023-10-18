import { SquareButton, Table } from 'votogether-design-system';

import { usePagedNoticeList } from '@hooks';

import * as S from './style';

export default function AdminNoticeTableFetcher() {
  const {
    data,
    setPage,
    page,
    hasNextPage,
    hasPrevPage,
    fetchNextPage,
    fetchPrevPage,
    getPageNumberList,
  } = usePagedNoticeList();

  if (!data) return <></>;

  return (
    <S.Container>
      <Table
        columns={['제목', '내용', '배너 타이틀', '베너 부제목', '생성일자', '마감일자']}
        rows={data.noticeList.map(
          ({ title, content, bannerTitle, bannerSubtitle, createdAt, deadline }) => ({
            title,
            content,
            bannerTitle,
            bannerSubtitle,
            createdAt,
            deadline,
          })
        )}
      />
      <S.ButtonContainer>
        {hasPrevPage && (
          <S.ButtonWrapper onClick={() => fetchPrevPage()}>
            <SquareButton theme="gray">{'<'}</SquareButton>
          </S.ButtonWrapper>
        )}
        {getPageNumberList(data.totalPageNumber).map(item => (
          <S.ButtonWrapper
            onClick={() => {
              setPage(item);
            }}
          >
            <SquareButton theme={page === item - 1 ? 'fill' : 'blank'}>{item}</SquareButton>
          </S.ButtonWrapper>
        ))}
        {hasNextPage && (
          <S.ButtonWrapper onClick={() => fetchNextPage(data.totalPageNumber)}>
            <SquareButton theme="gray">{'>'}</SquareButton>
          </S.ButtonWrapper>
        )}
      </S.ButtonContainer>
    </S.Container>
  );
}
