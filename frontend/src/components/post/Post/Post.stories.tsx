import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_NOT_VOTE_POST, MOCK_VOTE_POST } from '@mocks/mockData/post';

import Post from '.';

const meta: Meta<typeof Post> = {
  component: Post,
  decorators: [storyFn => <div style={{ width: '576px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof Post>;

export const PreviewNotVotedPost: Story = {
  render: () => <Post postInfo={MOCK_NOT_VOTE_POST} isPreview={true} />,
};

export const PreviewVotedPost: Story = {
  render: () => <Post postInfo={MOCK_VOTE_POST} isPreview={true} />,
};

export const NotVotedPost: Story = {
  render: () => <Post postInfo={MOCK_NOT_VOTE_POST} isPreview={false} />,
};

export const VotedPost: Story = {
  render: () => <Post postInfo={MOCK_VOTE_POST} isPreview={false} />,
};
