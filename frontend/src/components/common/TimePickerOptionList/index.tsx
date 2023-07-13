import React, { useState } from 'react';

import * as S from './style';
import TimePickerOption from './TimePickerOption';

export default function TimePickerOptionList() {
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
  });
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
      <S.PickedTimeText>
        <p>{day}일</p>
        <p>{hour}시</p>
        <p>{minute}분</p> 후 마감
      </S.PickedTimeText>
    </S.Wrapper>
  );
}
