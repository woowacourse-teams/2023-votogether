import type { Meta, StoryObj } from '@storybook/react';

import { COMMENT_MENU } from '@constants/comment';

import CommentMenu from '.';

const meta: Meta<typeof CommentMenu> = {
  component: CommentMenu,
};

export default meta;
type Story = StoryObj<typeof CommentMenu>;

export const WriterUser: Story = {
  render: () => <CommentMenu menuList={COMMENT_MENU.WRITER} handleMenuClick={() => {}} />,
};

export const NotWriterUser: Story = {
  render: () => <CommentMenu menuList={COMMENT_MENU.NOT_WRITER} handleMenuClick={() => {}} />,
};
