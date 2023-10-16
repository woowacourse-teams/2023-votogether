import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_USER_INFO } from '@mocks/mockData/user';

import UserProfile from '.';

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  render: () => <UserProfile userInfo={MOCK_USER_INFO} />,
};
