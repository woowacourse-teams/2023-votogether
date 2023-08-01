import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_TRANSFORMED_COMMENT_LIST } from '@mocks/mockData/comment';

import CommentList from '.';

const meta: Meta<typeof CommentList> = {
  component: CommentList,
};

export default meta;
type Story = StoryObj<typeof CommentList>;

export const Guest: Story = {
  render: () => (
    <CommentList
      commentList={MOCK_TRANSFORMED_COMMENT_LIST}
      memberId={0}
      isGuest={true}
      postWriterName="닉네임"
    />
  ),
};

export const Writer: Story = {
  render: () => (
    <CommentList
      commentList={MOCK_TRANSFORMED_COMMENT_LIST}
      memberId={MOCK_TRANSFORMED_COMMENT_LIST[0].member.id}
      isGuest={false}
      postWriterName="닉네임"
    />
  ),
};

export const Normal: Story = {
  render: () => (
    <CommentList
      commentList={MOCK_TRANSFORMED_COMMENT_LIST}
      memberId={0}
      isGuest={false}
      postWriterName="닉네임"
    />
  ),
};
