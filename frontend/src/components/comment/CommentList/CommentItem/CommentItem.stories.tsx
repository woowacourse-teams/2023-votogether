import type { Meta, StoryObj } from '@storybook/react';

import { COMMENT_USER } from '@constants/comment';

import { MOCK_COMMENT_LIST } from '@mocks/mockData/comment';

import CommentItem from '.';

const meta: Meta<typeof CommentItem> = {
  component: CommentItem,
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

export const Guest: Story = {
  render: () => <CommentItem comment={MOCK_COMMENT_LIST[0]} userType={COMMENT_USER.GUEST} />,
};

export const Writer: Story = {
  render: () => <CommentItem comment={MOCK_COMMENT_LIST[0]} userType={COMMENT_USER.WRITER} />,
};

export const Normal: Story = {
  render: () => <CommentItem comment={MOCK_COMMENT_LIST[0]} userType={COMMENT_USER.NORMAL} />,
};
