import type { Meta, StoryObj } from '@storybook/react';

import EmptyPostList from '.';

const meta: Meta<typeof EmptyPostList> = {
  component: EmptyPostList,
};

export default meta;
type Story = StoryObj<typeof EmptyPostList>;

export const Default: Story = {
  render: () => <EmptyPostList status="all" />,
};

export const AllKeyword: Story = {
  render: () => <EmptyPostList status="all" keyword="갤럭시" />,
};

export const ClosedKeyword: Story = {
  render: () => <EmptyPostList status="closed" keyword="갤럭시" />,
};

export const ProgressKeyword: Story = {
  render: () => <EmptyPostList status="progress" keyword="갤럭시" />,
};
