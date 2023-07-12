import type { Meta } from '@storybook/react';

import { useState } from 'react';

import TimePickerOption from '.';

const meta: Meta<typeof TimePickerOption> = {
  component: TimePickerOption,
};

export default meta;

export const Default = () => {
  const [hour, setHour] = useState(0);

  return (
    <>
      <TimePickerOption time={hour} timeUnit={24} handlePickTime={setHour} />
      <p>시간 단위: {hour}</p>
    </>
  );
};
