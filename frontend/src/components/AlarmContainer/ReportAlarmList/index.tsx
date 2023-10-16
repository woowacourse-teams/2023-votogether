import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReportType } from '@type/report';

import { useReadAlarm } from '@hooks/query/alarm/useReadAlarm';
import { useReportAlarmList } from '@hooks/query/alarm/useReportAlarmList';

import LoadingSpinner from '@components/common/LoadingSpinner';
import SquareButton from '@components/common/SquareButton';

import { PATH } from '@constants/path';

import { SHORTEN_TEXT_LENGTH } from '../constant';
import * as LS from '../ListStyle';
import * as S from '../style';

const REPORT_TYPE: Record<ReportType, { name: string; action: '삭제' | '변경' }> = {
  POST: { name: '게시글', action: '삭제' },
  COMMENT: { name: '댓글', action: '삭제' },
  NICKNAME: { name: '닉네임', action: '변경' },
};

export default function ReportAlarmList({ closeToolTip }: { closeToolTip: () => void }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isListEmpty } =
    useReportAlarmList();
  const { mutate } = useReadAlarm('REPORT');

  const navigation = useNavigate();

  if (isListEmpty) {
    return <LS.Description>현재 도착한 알림이 없습니다!</LS.Description>;
  }

  const handleAlarmClick = (alarmId: number, reportId: number) => {
    mutate(alarmId);

    navigation(`${PATH.REPORT_ALARM}/${reportId}`);
    closeToolTip();
  };

  return (
    <LS.ListContainer>
      {data?.pages.map((listInfo, pageIndex) => (
        <Fragment key={pageIndex}>
          {listInfo.alarmList.map(alarm => {
            const { reportId, type, content } = alarm.detail;
            const shortContent =
              content.length < SHORTEN_TEXT_LENGTH.DEFAULT
                ? content
                : `${content.slice(0, SHORTEN_TEXT_LENGTH.DEFAULT)}...`;

            return (
              <LS.ListItem key={alarm.alarmId} $isRead={alarm.isChecked}>
                <LS.LinkButton
                  onClick={() => {
                    handleAlarmClick(alarm.alarmId, reportId);
                  }}
                >
                  <p>{`"${shortContent}" ${REPORT_TYPE[type].name}이 신고를 받아 ${REPORT_TYPE[type].action}처리되었습니다.`}</p>
                  <p>{alarm.detail.createdAt}</p>
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
