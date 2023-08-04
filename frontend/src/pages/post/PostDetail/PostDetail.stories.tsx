import type { Meta, StoryObj } from '@storybook/react';

import PostDetailPage from '.';

const meta: Meta<typeof PostDetailPage> = {
  component: PostDetailPage,
};

export default meta;
type Story = StoryObj<typeof PostDetailPage>;

export const WriterCase: Story = {
  render: () => <PostDetailPage />,
};
