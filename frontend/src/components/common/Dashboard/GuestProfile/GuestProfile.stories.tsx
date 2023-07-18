import type { Meta, StoryObj } from '@storybook/react';

import GuestProfile from '.';

const meta: Meta<typeof GuestProfile> = {
  component: GuestProfile,
};

export default meta;
type Story = StoryObj<typeof GuestProfile>;

export const Default: Story = {
  render: () => <GuestProfile />,
};
