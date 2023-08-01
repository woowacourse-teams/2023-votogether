import type { Meta, StoryObj } from '@storybook/react';

import { Category } from '@type/category';

import CategoryToggle from '.';

const meta: Meta<typeof CategoryToggle> = {
  component: CategoryToggle,
};

export default meta;
type Story = StoryObj<typeof CategoryToggle>;

const MOCK_CATEGORIES: Category[] = [
  { id: 12312, name: '음식', isFavorite: false },
  { id: 12, name: '연애', isFavorite: false },
  { id: 13, name: '패션', isFavorite: false },
  { id: 14, name: '금융', isFavorite: false },
];

export const Default: Story = {
  render: () => <CategoryToggle title="즐겨찾기" categoryList={MOCK_CATEGORIES} />,
};

export const Closed: Story = {
  render: () => (
    <CategoryToggle title="즐겨찾기" categoryList={MOCK_CATEGORIES} isInitialOpen={false} />
  ),
};
