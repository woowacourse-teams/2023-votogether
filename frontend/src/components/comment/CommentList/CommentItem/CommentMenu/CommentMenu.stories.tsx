import type { Meta, StoryObj } from '@storybook/react';

import { COMMENT_MENU } from '@constants/comment';

import CommentMenu from '.';

const meta: Meta<typeof CommentMenu> = {
  component: CommentMenu,
};

export default meta;
type Story = StoryObj<typeof CommentMenu>;

export const Writer: Story = {
  render: () => <CommentMenu menuList={COMMENT_MENU.WRITER} handleMenuClick={() => {}} />,
};

export const NormalUser: Story = {
  render: () => <CommentMenu menuList={COMMENT_MENU.NORMAL} handleMenuClick={() => {}} />,
};
