import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_COMMENT_LIST } from '@mocks/mockData/comment';

import CommentList from '.';

const meta: Meta<typeof CommentList> = {
  component: CommentList,
};

export default meta;
type Story = StoryObj<typeof CommentList>;

export const Guest: Story = {
  render: () => <CommentList commentList={MOCK_COMMENT_LIST[0]} userType="guest" />,
};

export const Writer: Story = {
  render: () => <CommentList commentList={MOCK_COMMENT_LIST[0]} userType="writer" />,
};

export const Normal: Story = {
  render: () => <CommentList commentList={MOCK_COMMENT_LIST[0]} userType="normal" />,
};
