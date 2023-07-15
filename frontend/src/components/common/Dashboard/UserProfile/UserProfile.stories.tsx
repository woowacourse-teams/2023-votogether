import type { Meta, StoryObj } from '@storybook/react';

import UserProfile from '.';

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

const MOCK_USER_INFO = {
  nickname: '우아한 코끼리',
  postCount: 4,
  voteCount: 128,
  userPoint: 200,
};

export const NoBadge: Story = {
  render: () => <UserProfile {...MOCK_USER_INFO} />,
};

export const Badge: Story = {
  render: () => <UserProfile {...MOCK_USER_INFO} badge="만근자" />,
};
