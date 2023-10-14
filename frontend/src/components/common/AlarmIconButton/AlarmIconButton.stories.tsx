import type { Meta, StoryObj } from '@storybook/react';

import AlarmIconButton from '.';

const meta: Meta<typeof AlarmIconButton> = {
  component: AlarmIconButton,
  decorators: [
    storyFn => (
      <div style={{ width: '100%', height: '100px', backgroundColor: 'black' }}>{storyFn()}</div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AlarmIconButton>;

export const Active: Story = {
  render: () => <AlarmIconButton isActive={true} handleAlarmOpenClick={() => {}} />,
};

export const NotActive: Story = {
  render: () => <AlarmIconButton isActive={false} handleAlarmOpenClick={() => {}} />,
};
