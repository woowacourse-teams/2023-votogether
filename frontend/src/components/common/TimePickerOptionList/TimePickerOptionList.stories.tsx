import type { Meta } from '@storybook/react';

import { useState } from 'react';

import TimePickerOptionList from '.';

const meta: Meta<typeof TimePickerOptionList> = {
  component: TimePickerOptionList,
};

export default meta;

export const Default = () => {
  const [time, setTime] = useState({
    day: 1,
    hour: 3,
    minute: 25,
  });

  const changeDeadlinePicker = ({
    option,
    updatedTime,
  }: {
    option: string;
    updatedTime: number;
  }) => {
    setTime(prev => ({
      ...prev,
      [option]: updatedTime,
    }));
  };

  return (
    <>
      <TimePickerOptionList time={time} setTime={changeDeadlinePicker} />
    </>
  );
};
