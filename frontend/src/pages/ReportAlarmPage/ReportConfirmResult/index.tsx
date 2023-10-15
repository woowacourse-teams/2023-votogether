import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { ReportType } from '@type/report';

import { useReportConfirmResult } from '@hooks/query/useReportConfirmResult';

import ErrorBoundary from '@pages/ErrorBoundary';

import Skeleton from '@components/common/Skeleton';

import { REPORT_MESSAGE } from '@constants/policyMessage';

import ReportTargetPost from './ReportTargetPost';
import * as S from './style';

const reportType: Record<ReportType, { name: string; result: string }> = {
  POST: { name: '게시글', result: '게시글이 삭제조치 되었습니다.' },
  COMMENT: { name: '댓글', result: '댓글이 삭제조치 되었습니다.' },
  NICKNAME: { name: '닉네임', result: '닉네임이 변경조치 되었습니다.' },
};

export default function ReportConfirmResult() {
  const params = useParams() as { reportId: string };
  const reportId = Number(params.reportId);

  const { data } = useReportConfirmResult(reportId);

  return (
    data && (
      <S.Container>
        <S.ListItem>
          <b>대상 카테고리:</b> {reportType[data.type].name}
        </S.ListItem>
        <S.ListItem>
          <b>조치 :</b> {reportType[data.type].result}
        </S.ListItem>
        <S.ListItem>
          <b>조치 일시:</b> {data.createAt}
        </S.ListItem>
        <S.ListItem>
          <b>사유 </b>
          <S.List>
            {[...new Set(data.reason.map(each => REPORT_MESSAGE[each]))].map(reason => {
              return <S.ListItem>{reason}</S.ListItem>;
            })}
          </S.List>
        </S.ListItem>
        <S.ListItem>
          <b>대상 </b>
          <S.Content>
            <ErrorBoundary>
              <Suspense fallback={<Skeleton isLarge={false} />}>
                {data.type === 'POST' && <ReportTargetPost postId={Number(data.content)} />}
                {(data.type === 'COMMENT' || data.type === 'NICKNAME') && <p>{data.content}</p>}
              </Suspense>
            </ErrorBoundary>
          </S.Content>
        </S.ListItem>
      </S.Container>
    )
  );
}
