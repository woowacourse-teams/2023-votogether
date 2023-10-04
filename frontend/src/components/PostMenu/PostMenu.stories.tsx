import type { Meta, StoryObj } from '@storybook/react';

import { PostMenuItem } from '@type/menu';

import { COMMENT_MENU } from '@constants/post';

import PostMenu from '.';

const meta: Meta<typeof PostMenu> = {
  component: PostMenu,
};

export default meta;
type Story = StoryObj<typeof PostMenu>;

const menuList: PostMenuItem[] = [
  { color: 'black', content: '닉네임 신고', action: 'NICKNAME_REPORT' },
  { color: 'black', content: '게시글 신고', action: 'POST_REPORT' },
];

export const NotPostWriterUser: Story = {
  render: () => <PostMenu menuList={menuList} handleMenuClick={() => {}} />,
};

export const CommentWriterUser: Story = {
  render: () => <PostMenu menuList={COMMENT_MENU.WRITER} handleMenuClick={() => {}} />,
};

export const NotCommentWriterUser: Story = {
  render: () => <PostMenu menuList={COMMENT_MENU.NOT_WRITER} handleMenuClick={() => {}} />,
};
