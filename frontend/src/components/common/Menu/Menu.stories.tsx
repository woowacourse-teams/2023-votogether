import type { Meta, StoryObj } from '@storybook/react';

import { PostMenuItem } from '@type/menu';

import { COMMENT_MENU } from '@constants/post';

import Menu from '.';

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

const menuList: PostMenuItem[] = [
  { color: 'black', content: '닉네임 신고', action: 'NICKNAME_REPORT' },
  { color: 'black', content: '게시글 신고', action: 'POST_REPORT' },
  { color: 'black', content: '게시글 삭제', action: 'DELETE' },
];

export const Default: Story = {
  render: () => <Menu menuList={menuList} handleMenuClick={() => {}} />,
};

export const WriterUser: Story = {
  render: () => <Menu menuList={COMMENT_MENU.WRITER} handleMenuClick={() => {}} />,
};

export const NotWriterUser: Story = {
  render: () => <Menu menuList={COMMENT_MENU.NOT_WRITER} handleMenuClick={() => {}} />,
};
