import type { Meta, StoryObj } from '@storybook/react';

import type { User } from '@type/user';

import { MOCK_FAVORITE_CATEGORIES } from '@mocks/mockData/category';

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
