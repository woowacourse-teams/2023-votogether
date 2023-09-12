import type { Meta, StoryObj } from '@storybook/react';

import PostList from '.';

const meta: Meta<typeof PostList> = {
  component: PostList,
};

export default meta;
type Story = StoryObj<typeof PostList>;

export const Default: Story = {
  render: () => <PostList />,
};
