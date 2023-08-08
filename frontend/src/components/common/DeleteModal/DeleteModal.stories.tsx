import type { Meta, StoryObj } from '@storybook/react';

import DeleteModal from '.';

const meta: Meta<typeof DeleteModal> = {
  component: DeleteModal,
};

export default meta;
type Story = StoryObj<typeof DeleteModal>;

export const Post: Story = {
  render: () => (
    <DeleteModal target="게시물" handleCancelClick={() => {}} handleDeleteClick={() => {}} />
  ),
};

export const User: Story = {
  render: () => (
    <DeleteModal target="계정" handleCancelClick={() => {}} handleDeleteClick={() => {}} />
  ),
};
