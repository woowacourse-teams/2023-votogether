import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReportType } from '@type/report';

import { useReportAlarmList } from '@hooks/query/alarm/useReportAlarmList';

import LoadingSpinner from '@components/common/LoadingSpinner';
import SquareButton from '@components/common/SquareButton';

import { PATH } from '@constants/path';

import * as LS from '../ListStyle';
import * as S from '../style';

const REPORT_TYPE: Record<ReportType, string> = {
  POST: '게시글',
  COMMENT: '댓글',
  NICKNAME: '닉네임',
};

export default function ReportAlarmList({ closeToolTip }: { closeToolTip: () => void }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isListEmpty } =
    useReportAlarmList();
  const navigation = useNavigate();

  if (isListEmpty) {
    return <p>현재 도착한 알림이 없습니다!</p>;
  }

  const movePost = (postId: number) => {
    navigation(`${PATH.POST}/${postId}`);
    closeToolTip();
  };

  return (
    <LS.ListContainer>
      {data?.pages.map((listInfo, pageIndex) => (
        <Fragment key={pageIndex}>
          {listInfo.alarmList.map(alarm => {
            const { id: postId, type, content } = alarm.info;
            const shortContent = content.length < 8 ? content : `${content.slice(0, 8)}...`;

            return (
              <LS.ListItem key={alarm.id} $isRead={alarm.isRead}>
                <LS.LinkButton
                  onClick={() => {
                    movePost(postId);
                  }}
                >
                  <p>{`"${shortContent}" ${REPORT_TYPE[type]}이 신고를 받아 처리되었습니다.`}</p>
                  <p>{alarm.createAt}</p>
                </LS.LinkButton>
              </LS.ListItem>
            );
          })}
        </Fragment>
      ))}
      {isFetchingNextPage && (
        <S.LoadingSpinnerWrapper>
          <LoadingSpinner size="sm" />
        </S.LoadingSpinnerWrapper>
      )}
      {!isFetchingNextPage && hasNextPage && (
        <LS.ButtonWrapper>
          <SquareButton theme="fill" onClick={() => fetchNextPage()}>
            더보기
          </SquareButton>
        </LS.ButtonWrapper>
      )}
    </LS.ListContainer>
  );
}
