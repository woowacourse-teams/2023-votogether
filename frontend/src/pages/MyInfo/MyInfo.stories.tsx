import type { Meta, StoryObj } from '@storybook/react';

import MyInfo from '.';

const meta: Meta<typeof MyInfo> = {
  component: MyInfo,
};

export default meta;
type Story = StoryObj<typeof MyInfo>;

export const Default: Story = {
  render: () => <MyInfo />,
};
