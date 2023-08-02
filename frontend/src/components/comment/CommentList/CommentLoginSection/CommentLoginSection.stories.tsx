import type { Meta, StoryObj } from '@storybook/react';

import CommentLoginSection from '.';

const meta: Meta<typeof CommentLoginSection> = {
  component: CommentLoginSection,
};

export default meta;
type Story = StoryObj<typeof CommentLoginSection>;

export const Default: Story = {
  render: () => <CommentLoginSection name="닉네임" />,
};
