import { SquareButton, Table } from 'votogether-design-system';

import { usePagedNoticeList } from '@hooks';

import * as S from './style';

export default function AdminNoticeTableFetcher() {
  const { data, setPage, page } = usePagedNoticeList();

  const startPageNumber = Math.floor(page / 5) * 5;

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
        {startPageNumber > 0 && (
          <S.ButtonWrapper onClick={() => setPage(startPageNumber - 4)}>
            <SquareButton theme="gray">{'<'}</SquareButton>
          </S.ButtonWrapper>
        )}
        {Array.from(
          { length: Math.min(data.totalPageNumber - data.currentPageNumber, 5) },
          (_, index) => {
            return startPageNumber + (index % 5) + 1;
          }
        ).map(item => (
          <S.ButtonWrapper
            onClick={() => {
              setPage(item);
            }}
          >
            <SquareButton theme={page === item - 1 ? 'fill' : 'blank'}>{item}</SquareButton>
          </S.ButtonWrapper>
        ))}
        {data.totalPageNumber > startPageNumber + 5 && (
          <S.ButtonWrapper onClick={() => setPage(startPageNumber + 6)}>
            <SquareButton theme="gray">{'>'}</SquareButton>
          </S.ButtonWrapper>
        )}
      </S.ButtonContainer>
    </S.Container>
  );
}
