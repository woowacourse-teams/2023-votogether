import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { useContentAlarmList } from '@hooks/query/alarm/useContentAlarmList';
import { useReadAlarm } from '@hooks/query/alarm/useReadAlarm';

import LoadingSpinner from '@components/common/LoadingSpinner';
import SquareButton from '@components/common/SquareButton';

import { PATH } from '@constants/path';

import * as LS from '../ListStyle';
import * as S from '../style';

export default function ContentAlarmList({ closeToolTip }: { closeToolTip: () => void }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isListEmpty } =
    useContentAlarmList();
  const { mutate } = useReadAlarm('CONTENT');

  const navigation = useNavigate();

  if (isListEmpty) {
    return <p>현재 도착한 알림이 없습니다!</p>;
  }

  const handleAlarmClick = (alarmId: number, postId: number) => {
    mutate(alarmId);

    navigation(`${PATH.POST}/${postId}`);
    closeToolTip();
  };

  return (
    <LS.ListContainer>
      {data?.pages.map((listInfo, pageIndex) => (
        <Fragment key={pageIndex}>
          {listInfo.alarmList.map(alarm => {
            const { postId, postTitle: title, commentWriter: nickname } = alarm.detail;
            const shortTitle = title.length < 10 ? title : `${title.slice(0, 10)}...`;
            const shortNickname = nickname.length < 6 ? nickname : `${nickname.slice(0, 6)}...`;

            return (
              <LS.ListItem key={alarm.alarmId} $isRead={alarm.isChecked}>
                <LS.LinkButton
                  onClick={() => {
                    handleAlarmClick(alarm.alarmId, postId);
                  }}
                >
                  <p>
                    {nickname === ''
                      ? `"${shortTitle}" 게시글이 마감되었습니다!`
                      : `"${shortNickname}" 님이 "${shortTitle}" 게시글에 댓글을 달았습니다!`}
                  </p>
                  <p>{alarm.createdAt}</p>
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
