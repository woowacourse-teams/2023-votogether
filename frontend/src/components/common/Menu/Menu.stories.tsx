import type { Meta, StoryObj } from '@storybook/react';

import { PostAction } from '@type/menu';

import { COMMENT_MENU } from '@constants/post';

import { MenuItem } from './types';

import Menu from '.';

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

const NOT_WRITER_POST_MENU_LIST: MenuItem<PostAction>[] = [
  { color: 'black', content: '닉네임 신고', action: 'NICKNAME_REPORT' },
  { color: 'black', content: '게시글 신고', action: 'POST_REPORT' },
];

const WRITER_POST_MENU_LIST: MenuItem<PostAction>[] = [
  { color: 'black', content: '수 정', action: 'EDIT' },
  { color: 'red', content: '삭 제', action: 'DELETE' },
];

export const NotPostWriterUser: Story = {
  render: () => <Menu menuList={NOT_WRITER_POST_MENU_LIST} handleMenuClick={() => {}} />,
};

export const PostWriterUser: Story = {
  render: () => <Menu menuList={WRITER_POST_MENU_LIST} handleMenuClick={() => {}} />,
};

export const CommentWriterUser: Story = {
  render: () => <Menu menuList={COMMENT_MENU.WRITER} handleMenuClick={() => {}} />,
};

export const NotCommentWriterUser: Story = {
  render: () => <Menu menuList={COMMENT_MENU.NOT_WRITER} handleMenuClick={() => {}} />,
};
