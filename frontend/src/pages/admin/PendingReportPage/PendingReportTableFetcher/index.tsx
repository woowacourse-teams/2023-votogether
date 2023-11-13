import { SquareButton, Table } from 'votogether-design-system';

import { ReportActionRequest } from '@type/report';

import { usePendingReportActionList } from '@hooks/query/report/usePendingReportActionList';
import { useReportAction } from '@hooks/query/report/useReportAction';

import { PATH } from '@constants/path';
import { REPORT_ACTION_TYPE, REPORT_TYPE } from '@constants/report';

import { truncateText } from '@utils/truncateText';

import * as S from './style';

interface ReportDetail {
  typeName: keyof typeof REPORT_ACTION_TYPE;
  target: string;
}

export default function PendingReportTableFetcher() {
  const {
    data,
    setPage,
    page,
    hasNextPage,
    hasPrevPage,
    fetchNextPage,
    fetchPrevPage,
    getPageNumberList,
  } = usePendingReportActionList();

  const { mutate: reportAction } = useReportAction();

  const columnList = ['순번', '내용', '일시', '종류', '사유', '수정/삭제', '신고 해제'];

  const handleClickButton = (reportData: ReportActionRequest, reportDetail: ReportDetail) => {
    const { typeName, target } = reportDetail;
    const editOrDeleteText = REPORT_ACTION_TYPE[typeName];
    const message = `'${typeName}: ${target}'을 ${
      reportData.hasAction ? editOrDeleteText : '신고 해제'
    }하시겠습니까?`;

    if (window.confirm(message)) reportAction(reportData);
  };

  if (!data) return <></>;

  const reportListWithAction = data.reportList.map((report, index) => {
    const reportData = { id: report.id, hasAction: true };
    const reportDetail = {
      typeName: report.typeName,
      target: truncateText(report.target),
      isNickname: report.typeName === REPORT_TYPE.NICKNAME,
    };
    return {
      ...report,
      id: index + 1,
      target:
        report.typeName === '게시글' ? (
          <S.PostDetailLink to={`${PATH.POST}/${report.target}`}>게시글 보러가기</S.PostDetailLink>
        ) : (
          report.target
        ),
      editOrDeleteAction: (
        <S.ReportActionButton
          $isEdit={report.typeName === REPORT_TYPE.NICKNAME}
          onClick={() => handleClickButton(reportData, reportDetail)}
        >
          {REPORT_ACTION_TYPE[report.typeName]}
        </S.ReportActionButton>
      ),
      deleteReport: (
        <S.ReportDeleteButton
          onClick={() => handleClickButton({ ...reportData, hasAction: false }, reportDetail)}
        >
          해제
        </S.ReportDeleteButton>
      ),
    };
  });

  return (
    <>
      <Table
        columns={columnList}
        rows={reportListWithAction}
        columnTemplate="1fr 2fr 3fr 2fr 4fr 2fr 2fr"
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
    </>
  );
}
