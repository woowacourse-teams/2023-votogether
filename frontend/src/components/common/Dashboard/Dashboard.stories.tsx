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
  { id: 12312, name: '음식', isFavorite: false },
  { id: 12, name: '연애', isFavorite: false },
  { id: 13, name: '패션', isFavorite: false },
  { id: 14, name: '금융', isFavorite: false },
];

const MOCK_FAVORITE_CATEGORIES: Category[] = [
  { id: 12312, name: '음식', isFavorite: false },
  { id: 12, name: '연애', isFavorite: true },
  { id: 13, name: '패션', isFavorite: true },
  { id: 14, name: '금융', isFavorite: false },
];

const MOCK_LONG_CATEGORIES: Category[] = [
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
  { id: 12312, name: '음식', isFavorite: false },
  { id: 12, name: '연애', isFavorite: true },
  { id: 13, name: '패션', isFavorite: true },
  { id: 14, name: '금융', isFavorite: false },
  { id: 12312, name: '음식', isFavorite: false },
  { id: 12, name: '연애', isFavorite: true },
  { id: 13, name: '패션', isFavorite: true },
  { id: 14, name: '금융', isFavorite: false },
];

export const LoggedIn: Story = {
  render: () => (
    <Dashboard
      userInfo={MOCK_USER_INFO}
      categoryList={MOCK_CATEGORIES}
      handleFavoriteClick={() => {}}
      handleLogoutClick={() => {}}
    />
  ),
};

export const FavoriteCategory: Story = {
  render: () => (
    <Dashboard
      userInfo={MOCK_USER_INFO}
      categoryList={MOCK_FAVORITE_CATEGORIES}
      handleFavoriteClick={() => {}}
      handleLogoutClick={() => {}}
    />
  ),
};

export const SelectedCategory: Story = {
  render: () => (
    <Dashboard
      userInfo={MOCK_USER_INFO}
      categoryList={MOCK_FAVORITE_CATEGORIES}
      selectedCategory="패션"
      handleFavoriteClick={() => {}}
      handleLogoutClick={() => {}}
    />
  ),
};

export const LongCategoryList: Story = {
  render: () => (
    <Dashboard
      userInfo={MOCK_USER_INFO}
      categoryList={MOCK_LONG_CATEGORIES}
      handleFavoriteClick={() => {}}
      handleLogoutClick={() => {}}
    />
  ),
};

export const Guest: Story = {
  render: () => (
    <Dashboard
      categoryList={MOCK_CATEGORIES}
      handleFavoriteClick={() => {}}
      handleLogoutClick={() => {}}
    />
  ),
};
