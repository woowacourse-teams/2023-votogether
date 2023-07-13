import type { Meta } from '@storybook/react';

import { useState } from 'react';

import TimePickerOptionList from '.';

const meta: Meta<typeof TimePickerOptionList> = {
  component: TimePickerOptionList,
};

export default meta;

export const Default = () => {
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
  });

  return (
    <>
      <TimePickerOptionList time={time} setTime={setTime} />
    </>
  );
};
