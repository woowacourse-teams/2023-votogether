import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_COMMENT_LIST } from '@mocks/mockData/comment';

import CommentItem from '.';

const meta: Meta<typeof CommentItem> = {
  component: CommentItem,
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

export const Default: Story = {
  render: () => <CommentItem comment={MOCK_COMMENT_LIST[0]} />,
};
