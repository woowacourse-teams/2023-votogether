import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_COMMENT_LIST } from '@mocks/mockData/comment';

import { COMMENT_USER } from '../constants';

import CommentItem from '.';

const meta: Meta<typeof CommentItem> = {
  component: CommentItem,
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

export const GuestUser: Story = {
  render: () => <CommentItem comment={MOCK_COMMENT_LIST[0]} userType={COMMENT_USER.GUEST} />,
};

export const WriterUser: Story = {
  render: () => <CommentItem comment={MOCK_COMMENT_LIST[0]} userType={COMMENT_USER.WRITER} />,
};

export const NotWriterUser: Story = {
  render: () => <CommentItem comment={MOCK_COMMENT_LIST[0]} userType={COMMENT_USER.NOT_WRITER} />,
};
