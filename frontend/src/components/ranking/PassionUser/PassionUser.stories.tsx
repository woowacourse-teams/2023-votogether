import type { Meta, StoryObj } from '@storybook/react';

import PassionUser from '.';

const meta: Meta<typeof PassionUser> = {
  component: PassionUser,
};

export default meta;
type Story = StoryObj<typeof PassionUser>;

export const Default: Story = {
  render: () => <PassionUser />,
};
