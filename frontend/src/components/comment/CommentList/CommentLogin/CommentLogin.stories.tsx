import type { Meta, StoryObj } from '@storybook/react';

import CommentLogin from '.';

const meta: Meta<typeof CommentLogin> = {
  component: CommentLogin,
};

export default meta;
type Story = StoryObj<typeof CommentLogin>;

export const Default: Story = {
  render: () => <CommentLogin name="닉네임" />,
};
