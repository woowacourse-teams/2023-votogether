import type { Meta, StoryObj } from '@storybook/react';

import EmptyPostList from '.';

const meta: Meta<typeof EmptyPostList> = {
  component: EmptyPostList,
};

export default meta;
type Story = StoryObj<typeof EmptyPostList>;

export const Default: Story = {
  render: () => <EmptyPostList />,
};

export const Keyword: Story = {
  render: () => <EmptyPostList keyword="갤럭시" />,
};
