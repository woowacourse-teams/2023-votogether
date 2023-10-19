import { SquareButton, Table } from 'votogether-design-system';

import { useDeleteNotice, usePagedNoticeList } from '@hooks';

import { PATH } from '@constants/path';

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
  const { mutate: deleteNotice } = useDeleteNotice();

  const handleNoticeDeleteClick = (title: string, noticeId: number) => {
    const isDeleteConfirmed = window.confirm(`공지사항 제목: "${title}" 을 삭제하시겠습니까?`);

    if (isDeleteConfirmed) {
      deleteNotice(noticeId);
    }
  };

  if (!data) return <></>;

  return (
    <S.Container>
      <Table
        columns={[
          '제목',
          '내용',
          '배너 제목',
          '베너 부제목',
          '생성일자',
          '마감일자',
          '수정하기',
          '삭제하기',
        ]}
        rows={data.noticeList.map(
          ({ id, title, content, bannerTitle, bannerSubtitle, createdAt, deadline }) => ({
            title,
            content,
            bannerTitle,
            bannerSubtitle,
            createdAt,
            deadline,
            editButton: (
              <S.EditButtonWrapper to={`${PATH.ADMIN_NOTICE}/${id}`}>
                <SquareButton theme="fill">수정</SquareButton>
              </S.EditButtonWrapper>
            ),
            deleteButton: (
              <S.DeleteButtonWrapper onClick={() => handleNoticeDeleteClick(title, id)}>
                <SquareButton theme="blank">삭제</SquareButton>
              </S.DeleteButtonWrapper>
            ),
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
