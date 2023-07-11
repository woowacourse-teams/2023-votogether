import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import * as S from './style';
import TimePickerOption from './TimePickerOption';

const meta: Meta<typeof TimePickerOption> = {
  component: TimePickerOption,
};

export default meta;
type Story = StoryObj<typeof TimePickerOption>;

export const Default = () => {
  const [hour, setHour] = useState(0);

  return (
    <>
      <TimePickerOption time={hour} timeUnit={24} pickTime={setHour} />
      <p>시간 단위: {hour}</p>
    </>
  );
};

export const MultipleOption = () => {
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  return (
    <>
      <S.Wrapper>
        <TimePickerOption time={day} timeUnit={3} pickTime={setDay} />
        <TimePickerOption time={hour} timeUnit={24} pickTime={setHour} />
        <TimePickerOption time={minute} timeUnit={60} pickTime={setMinute} />
      </S.Wrapper>
      <S.PickedTimeText>
        <p>{day}일</p>
        <p>{hour}시</p>
        <p>{minute}분</p> 후 마감
      </S.PickedTimeText>
    </>
  );
};
