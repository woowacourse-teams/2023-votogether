import React, { Dispatch } from 'react';

import * as S from './style';
import TimePickerOption from './TimePickerOption';

interface Time {
  day: number;
  hour: number;
  minute: number;
}

interface TimePickerOptionListProps {
  time: Time;
  setTime: Dispatch<React.SetStateAction<Time>>;
}

export default function TimePickerOptionList({ time, setTime }: TimePickerOptionListProps) {
  const { day, hour, minute } = time;

  const updateTime = (option: string, updatedTime: number) => {
    setTime(prev => ({
      ...prev,
      [option]: updatedTime,
    }));
  };

  return (
    <S.Wrapper>
      <S.Container>
        {Object.entries(time).map(([key, value]) => (
          <TimePickerOption
            key={key}
            currentTime={value}
            option={key}
            handlePickTime={updateTime}
          ></TimePickerOption>
        ))}
      </S.Container>
      <S.PickedTimeText tabIndex={0}>
        <p>{day}일</p>
        <p>{hour}시</p>
        <p>{minute}분</p> 후 마감
      </S.PickedTimeText>
    </S.Wrapper>
  );
}
