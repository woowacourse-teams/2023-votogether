import { useNavigate, useParams } from 'react-router-dom';

import { LoadingSpinner, Table } from 'votogether-design-system';

import { ReportActionRequest } from '@type/report';

import { usePendingReportActionList } from '@hooks/query/report/usePendingReportActionList';
import { useReportAction } from '@hooks/query/report/useReportAction';

import Layout from '@components/common/Layout';

import { PATH } from '@constants/path';
import { REPORT_ACTION_TYPE, REPORT_TYPE } from '@constants/report';

import * as S from './stlye';

export interface ReportDetail {
  typeName: string;
  target: string;
  isEdit: boolean;
}

export default function PendingReportPage() {
  const navigate = useNavigate();

  const params = useParams() as { page: string };
  const currentPageNumber = params.page ? Number(params.page) : 1;

  const columnList = ['Id', '사유', '내용', '일시', '종류', '수정/삭제', '신고 해제'];
  const { data, isLoading } = usePendingReportActionList(currentPageNumber - 1);
  const { mutate: reportAction } = useReportAction();

  const handleClickButton = (reportData: ReportActionRequest, reportDetail: ReportDetail) => {
    const { typeName, target, isEdit } = reportDetail;
    const editOrDelete = isEdit ? '수정' : '삭제';
    const message = `'${typeName}: ${target}'을 ${
      reportData.hasAction ? editOrDelete : '신고 해제'
    }하시겠습니까?`;

    if (window.confirm(message)) reportAction(reportData);
  };

  const reportListWithAction = data
    ? data.reportList.map(report => {
        const reportData = { id: report.id, hasAction: true };
        const reportDetail = {
          typeName: report.typeName,
          target: report.target,
          isEdit: report.typeName === REPORT_TYPE.NICKNAME,
        };
        return {
          ...report,
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
      })
    : [];

  return (
    <Layout isSidebarVisible={false}>
      <S.Wrapper>
        <S.PageTitle>신고 조치 예정 목록</S.PageTitle>
        {isLoading && <LoadingSpinner size="md" />}
        {data && (
          <>
            <Table
              columns={columnList}
              rows={reportListWithAction}
              columnTemplate="1fr 3fr 3fr 2fr 3fr 2fr 2fr"
            />
            <S.PaginationContainer>
              <S.MovePageButton
                onClick={() =>
                  navigate(`${PATH.PENDING_REPORT}?page=${data.currentPageNumber - 1}`)
                }
                disabled={currentPageNumber === 1}
              >
                이전
              </S.MovePageButton>
              {new Array(data.totalPageNumber).fill(0).map((_, index) => (
                <S.PaginationButton
                  to={`${PATH.PENDING_REPORT}?page=${currentPageNumber}`}
                  $isSelected={index + 1 === currentPageNumber}
                >
                  {index + 1}
                </S.PaginationButton>
              ))}
              <S.MovePageButton
                onClick={() =>
                  navigate(`${PATH.PENDING_REPORT}?page=${data.currentPageNumber + 1}`)
                }
                disabled={currentPageNumber === data.totalPageNumber}
              >
                다음
              </S.MovePageButton>
            </S.PaginationContainer>
          </>
        )}
      </S.Wrapper>
    </Layout>
  );
}
