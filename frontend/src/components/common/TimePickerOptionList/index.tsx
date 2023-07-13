import React, { useState } from 'react';

import * as S from './style';
import TimePickerOption from './TimePickerOption';

export default function TimePickerOptionList() {
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  return (
    <S.Wrapper>
      <S.Container>
        <TimePickerOption time={day} timeUnit={3} handlePickTime={setDay} />
        <TimePickerOption time={hour} timeUnit={24} handlePickTime={setHour} />
        <TimePickerOption time={minute} timeUnit={60} handlePickTime={setMinute} />
      </S.Container>
      <S.PickedTimeText>
        <p>{day}일</p>
        <p>{hour}시</p>
        <p>{minute}분</p> 후 마감
      </S.PickedTimeText>
    </S.Wrapper>
  );
}
