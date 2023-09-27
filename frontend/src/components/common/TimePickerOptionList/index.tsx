import React, { Dispatch } from 'react';

import { DHMTime } from '@type/time';

import { MAX_DEADLINE } from '@constants/policy';

import * as S from './style';
import TimePickerOption from './TimePickerOption';

interface TimePickerOptionListProps {
  time: DHMTime;
  setTime: Dispatch<React.SetStateAction<DHMTime>>;
}

export default function TimePickerOptionList({ time, setTime }: TimePickerOptionListProps) {
  const changedTime =
    time.day === MAX_DEADLINE ? { day: MAX_DEADLINE - 1, hour: 23, minute: 59 } : time;

  const updateTime = (option: string, updatedTime: number) => {
    setTime(prev => ({
      ...prev,
      [option]: updatedTime,
    }));
  };

  return (
    <S.Wrapper>
      <S.Container>
        {Object.entries(changedTime).map(([key, value]) => (
          <TimePickerOption
            key={key}
            currentTime={value}
            option={key}
            handlePickTime={updateTime}
          />
        ))}
      </S.Container>
      <S.PickedTimeText tabIndex={0}>
        <p>{changedTime.day}일</p>
        <p>{changedTime.hour}시</p>
        <p>{changedTime.minute}분</p> 후 마감
      </S.PickedTimeText>
    </S.Wrapper>
  );
}
