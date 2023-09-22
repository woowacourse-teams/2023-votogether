import type { Meta, StoryObj } from '@storybook/react';

import DeleteModal from '.';

const meta: Meta<typeof DeleteModal> = {
  component: DeleteModal,
};

export default meta;
type Story = StoryObj<typeof DeleteModal>;

export const Post: Story = {
  render: () => (
    <DeleteModal
      target="POST"
      handleCancelClick={() => {}}
      handleDeleteClick={() => {}}
      isDeleting={false}
    />
  ),
};

export const User: Story = {
  render: () => (
    <DeleteModal
      target="MEMBERSHIP"
      handleCancelClick={() => {}}
      handleDeleteClick={() => {}}
      isDeleting={false}
    />
  ),
};
