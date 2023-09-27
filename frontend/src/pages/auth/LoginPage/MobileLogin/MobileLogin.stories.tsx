import type { Meta, StoryObj } from '@storybook/react';

import MobileLogin from '.';

const meta: Meta<typeof MobileLogin> = {
  component: MobileLogin,
};

export default meta;
type Story = StoryObj<typeof MobileLogin>;

export const Default: Story = {
  render: () => <MobileLogin />,
};
