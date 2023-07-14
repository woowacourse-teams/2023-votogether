import type { Meta } from '@storybook/react';

import { useState } from 'react';

import TimePickerOption from '.';

const meta: Meta<typeof TimePickerOption> = {
  component: TimePickerOption,
};

export default meta;

export const Default = () => {
  const [time, setTime] = useState({
    day: 0,
    hour: 5,
    minute: 0,
  });

  const updateTime = (option: string, updatedTime: number) => {
    setTime(prev => ({
      ...prev,
      [option]: updatedTime,
    }));
  };

  return (
    <>
      <TimePickerOption currentTime={time.hour} option="hour" handlePickTime={updateTime} />
      <p>시간 단위: {time.hour}</p>
    </>
  );
};
