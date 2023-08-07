import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_TRANSFORMED_COMMENT_LIST } from '@mocks/mockData/comment';

import CommentTextForm from '.';

const meta: Meta<typeof CommentTextForm> = {
  component: CommentTextForm,
};

export default meta;
type Story = StoryObj<typeof CommentTextForm>;

const initialComment = {
  id: -1,
  member: {
    id: -1,
    nickname: '',
  },
  content: '',
  createdAt: '',
  isEdit: false,
};

export const InitForm: Story = {
  render: () => <CommentTextForm commentId={-1} initialComment={initialComment} />,
};

export const EditForm: Story = {
  render: () => (
    <CommentTextForm
      commentId={MOCK_TRANSFORMED_COMMENT_LIST[0].id}
      initialComment={MOCK_TRANSFORMED_COMMENT_LIST[0]}
      handleCancelClick={() => {}}
    />
  ),
};
