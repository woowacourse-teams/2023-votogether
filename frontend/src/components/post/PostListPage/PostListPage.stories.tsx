import type { Meta, StoryObj } from '@storybook/react';

import PostListPage from '.';

const meta: Meta<typeof PostListPage> = {
  component: PostListPage,
};

export default meta;
type Story = StoryObj<typeof PostListPage>;

export const Default: Story = {
  render: () => <PostListPage />,
};
