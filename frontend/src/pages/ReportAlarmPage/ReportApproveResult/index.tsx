import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { useReportApproveResult } from '@hooks/query/useReportApproveResult';

import ErrorBoundary from '@pages/ErrorBoundary';

import Skeleton from '@components/common/Skeleton';

import { REPORT_MESSAGE, REPORT_TYPE } from '@constants/policyMessage';

import ReportTargetPost from './ReportTargetPost';
import * as S from './style';

export default function ReportApproveResult() {
  const params = useParams() as { reportId: string };
  const reportId = Number(params.reportId);

  const { data } = useReportApproveResult(reportId);

  return (
    data && (
      <S.Container>
        <S.ListItem>
          <b>대상 카테고리:</b> {REPORT_TYPE[data.type].name}
        </S.ListItem>
        <S.ListItem>
          <b>조치 :</b> {REPORT_TYPE[data.type].actionMessage}
        </S.ListItem>
        <S.ListItem>
          <b>조치 일시:</b> {data.createdAt}
        </S.ListItem>
        <S.ListItem>
          <b>사유 </b>
          <S.List>
            {[...new Set(data.reasonList.map(each => REPORT_MESSAGE[each]))].map(reason => {
              return <S.ListItem key={reason}>{reason}</S.ListItem>;
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
