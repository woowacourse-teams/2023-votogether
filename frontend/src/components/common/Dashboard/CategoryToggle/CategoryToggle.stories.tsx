import type { Meta, StoryObj } from '@storybook/react';

import CategoryToggle from '.';

const meta: Meta<typeof CategoryToggle> = {
  component: CategoryToggle,
};

export default meta;
type Story = StoryObj<typeof CategoryToggle>;

const MOCK_CATEGORIES = [
  { id: 12312, name: '음식', favorite: false },
  { id: 12, name: '연애', favorite: false },
  { id: 13, name: '패션', favorite: false },
  { id: 14, name: '금융', favorite: false },
];

export const Default: Story = {
  render: () => (
    <CategoryToggle handleFavoriteClick={() => {}} title="즐겨찾기" categories={MOCK_CATEGORIES} />
  ),
};

export const Closed: Story = {
  render: () => (
    <CategoryToggle
      handleFavoriteClick={() => {}}
      title="즐겨찾기"
      categories={MOCK_CATEGORIES}
      initialOpen={false}
    />
  ),
};
