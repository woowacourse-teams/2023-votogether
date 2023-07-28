import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_COMMENT_LIST } from '@mocks/mockData/comment';

import CommentEditForm from '.';

const meta: Meta<typeof CommentEditForm> = {
  component: CommentEditForm,
};

export default meta;
type Story = StoryObj<typeof CommentEditForm>;

export const Default: Story = {
  render: () => (
    <CommentEditForm initialComment={MOCK_COMMENT_LIST[0].content} handleCancelClick={() => {}} />
  ),
};
