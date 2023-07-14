import type { Meta, StoryObj } from '@storybook/react';

import UserProfile from '.';

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const defaultButton: Story = {
  render: () => <UserProfile />,
};
