import { Fragment } from 'react';

import { useContentAlarmList } from '@hooks/query/alarm/useContentAlarmList';

import LoadingSpinner from '@components/common/LoadingSpinner';
import SquareButton from '@components/common/SquareButton';

import * as S from '../style';

export default function ContentAlarmList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isListEmpty } =
    useContentAlarmList();

  if (isListEmpty) {
    return <p>현재 도착한 알림이 없습니다!</p>;
  }

  return (
    <div>
      {data?.pages.map((listInfo, pageIndex) => (
        <Fragment key={pageIndex}>
          {listInfo.alarmList.map((alarm, index) => {
            return <div key={alarm.id}>{alarm.info.title}</div>;
          })}
        </Fragment>
      ))}
      {isFetchingNextPage && (
        <S.LoadingSpinnerWrapper>
          <LoadingSpinner size="sm" />
        </S.LoadingSpinnerWrapper>
      )}
      {!isFetchingNextPage && hasNextPage && (
        <SquareButton theme="blank" onClick={() => fetchNextPage()}>
          더보기
        </SquareButton>
      )}
    </div>
  );
}
