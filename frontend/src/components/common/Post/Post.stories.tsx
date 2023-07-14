import type { Meta, StoryObj } from '@storybook/react';

import { mockNotVotedPost, mockVotedPost } from './mockData';

import Post from '.';

const meta: Meta<typeof Post> = {
  component: Post,
  decorators: [storyFn => <div style={{ width: '576px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof Post>;

export const PreviewNotVotedPost: Story = {
  render: () => <Post postInfo={mockNotVotedPost} isPreview={true} />,
};

export const PreviewVotedPost: Story = {
  render: () => <Post postInfo={mockVotedPost} isPreview={true} />,
};

export const NotVotedPost: Story = {
  render: () => <Post postInfo={mockNotVotedPost} isPreview={false} />,
};

export const VotedPost: Story = {
  render: () => <Post postInfo={mockVotedPost} isPreview={false} />,
};
