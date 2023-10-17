import type { Meta, StoryObj } from '@storybook/react';

import { User } from '@type/user';

import UserProfile from '.';

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

const MOCK_USER_INFO: User = {
  nickname: '우아한 코끼리',
  gender: 'MALE',
  birthYear: 1989,
  postCount: 4,
  voteCount: 128,
  hasLatestAlarm: false,
  role: 'USER',
};

export const NoBadge: Story = {
  render: () => <UserProfile userInfo={MOCK_USER_INFO} />,
};

export const Badge: Story = {
  render: () => <UserProfile userInfo={MOCK_USER_INFO} />,
};
