import type { Meta, StoryObj } from '@storybook/react';

import { Category } from '@type/category';
import type { User } from '@type/user';

import Skeleton from '../Skeleton';

import Layout from '.';

const meta: Meta<typeof Layout> = {
  component: Layout,
};

export default meta;
type Story = StoryObj<typeof Layout>;

const MOCK_USER_INFO: User = {
  nickname: '우아한 코끼리',
  postCount: 4,
  voteCount: 128,
  userPoint: 200,
};

const MOCK_FAVORITE_CATEGORIES: Category[] = [
  { id: 12312, name: '음식', isFavorite: false },
  { id: 12, name: '연애', isFavorite: true },
  { id: 13, name: '패션', isFavorite: true },
  { id: 14, name: '금융', isFavorite: false },
  { id: 12312, name: '음식', isFavorite: false },
  { id: 12, name: '연애', isFavorite: true },
  { id: 13, name: '패션', isFavorite: true },
  { id: 14, name: '금융', isFavorite: false },
  { id: 12312, name: '음식', isFavorite: false },
  { id: 12, name: '연애', isFavorite: true },
  { id: 13, name: '패션', isFavorite: true },
  { id: 14, name: '금융', isFavorite: false },
  { id: 12312, name: '음식', isFavorite: false },
  { id: 12, name: '연애', isFavorite: true },
  { id: 13, name: '패션', isFavorite: true },
  { id: 14, name: '금융', isFavorite: false },
];

export const VisibleCategory: Story = {
  render: () => (
    <Layout
      isSidebarVisible={true}
      userInfo={MOCK_USER_INFO}
      categoryList={MOCK_FAVORITE_CATEGORIES}
      handleFavoriteClick={() => {}}
      handleLogoutClick={() => {}}
    >
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Layout>
  ),
};

export const HiddenCategory: Story = {
  render: () => (
    <Layout
      isSidebarVisible={false}
      categoryList={MOCK_FAVORITE_CATEGORIES}
      handleFavoriteClick={() => {}}
      handleLogoutClick={() => {}}
    >
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Layout>
  ),
};
