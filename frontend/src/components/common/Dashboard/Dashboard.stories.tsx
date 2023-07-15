import type { Meta, StoryObj } from '@storybook/react';

import { Category } from '@type/category';
import { User } from '@type/user';

import Dashboard from '.';

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

const MOCK_USER_INFO: User = {
  nickname: '우아한 코끼리',
  postCount: 4,
  voteCount: 128,
  userPoint: 200,
};

const MOCK_CATEGORIES: Category[] = [
  { id: 12312, name: '음식', favorite: false },
  { id: 12, name: '연애', favorite: false },
  { id: 13, name: '패션', favorite: false },
  { id: 14, name: '금융', favorite: false },
];

export const Default: Story = {
  render: () => <Dashboard />,
};
