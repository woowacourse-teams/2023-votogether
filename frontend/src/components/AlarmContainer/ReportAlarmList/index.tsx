import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { useReadAlarm } from '@hooks/query/alarm/useReadAlarm';
import { useReportAlarmList } from '@hooks/query/alarm/useReportAlarmList';

import LoadingSpinner from '@components/common/LoadingSpinner';
import SquareButton from '@components/common/SquareButton';

import { PATH } from '@constants/path';
import { REPORT_TYPE } from '@constants/policyMessage';

import { SHORTEN_TEXT_LENGTH } from '../constant';
import * as LS from '../ListStyle';
import * as S from '../style';

export default function ReportAlarmList({ closeToolTip }: { closeToolTip: () => void }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isListEmpty } =
    useReportAlarmList();
  const { mutate } = useReadAlarm('REPORT');

  const navigation = useNavigate();

  if (isListEmpty) {
    return <LS.Description>현재 도착한 알림이 없습니다!</LS.Description>;
  }

  const handleAlarmClick = (alarmId: number, isChecked: boolean, reportId: number) => {
    if (!isChecked) mutate(alarmId);

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
                    handleAlarmClick(alarm.alarmId, alarm.isChecked, reportId);
                  }}
                >
                  <p>{`신고를 받아 "${shortContent}" ${REPORT_TYPE[type].actionMessage}`}</p>
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
