import type { Meta, StoryObj } from '@storybook/react';

import { COMMENT_USER } from '@constants/post';

import { MOCK_TRANSFORMED_COMMENT_LIST } from '@mocks/mockData/comment';

import CommentItem from '.';

const meta: Meta<typeof CommentItem> = {
  component: CommentItem,
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

export const GuestUser: Story = {
  render: () => (
    <CommentItem comment={MOCK_TRANSFORMED_COMMENT_LIST[0]} userType={COMMENT_USER.GUEST} />
  ),
};

export const WriterUser: Story = {
  render: () => (
    <CommentItem comment={MOCK_TRANSFORMED_COMMENT_LIST[0]} userType={COMMENT_USER.WRITER} />
  ),
};

export const NotWriterUser: Story = {
  render: () => (
    <CommentItem comment={MOCK_TRANSFORMED_COMMENT_LIST[0]} userType={COMMENT_USER.NOT_WRITER} />
  ),
};
