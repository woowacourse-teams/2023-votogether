import type { Meta, StoryObj } from '@storybook/react';

import CommentDeleteModal from '.';

const meta: Meta<typeof CommentDeleteModal> = {
  component: CommentDeleteModal,
};

export default meta;
type Story = StoryObj<typeof CommentDeleteModal>;

export const Default: Story = {
  render: () => <CommentDeleteModal handleCancelClick={() => {}} handleDeleteClick={() => {}} />,
};
