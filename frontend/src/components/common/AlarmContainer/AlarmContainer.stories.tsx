import type { Meta } from '@storybook/react';

import AlarmContainer from '.';

const meta: Meta<typeof AlarmContainer> = {
  component: AlarmContainer,
};

export default meta;

export const Default = () => {
  return <AlarmContainer closeToolTip={() => {}} />;
};
