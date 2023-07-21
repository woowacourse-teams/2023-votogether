import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_FAVORITE_CATEGORIES } from '@mocks/mockData/category';
import { MOCK_USER_INFO } from '@mocks/mockData/user';

import PostListPage from '.';

const meta: Meta<typeof PostListPage> = {
  component: PostListPage,
};

export default meta;
type Story = StoryObj<typeof PostListPage>;

export const Default: Story = {
  render: () => (
    <PostListPage
      userInfo={MOCK_USER_INFO}
      categoryList={MOCK_FAVORITE_CATEGORIES}
      handleFavoriteClick={() => {}}
      handleLogoutClick={() => {}}
    />
  ),
};
