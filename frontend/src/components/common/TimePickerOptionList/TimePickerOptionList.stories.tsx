import type { Meta, StoryObj } from '@storybook/react';

import TimePickerOptionList from '.';

const meta: Meta<typeof TimePickerOptionList> = {
  component: TimePickerOptionList,
};

export default meta;
type Story = StoryObj<typeof TimePickerOptionList>;

export const Default: Story = {
  render: () => <TimePickerOptionList />,
};
