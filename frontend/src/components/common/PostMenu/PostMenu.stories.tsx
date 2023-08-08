import type { Meta, StoryObj } from '@storybook/react';

import { MenuItem } from '@type/menu';

import PostMenu from '.';

const meta: Meta<typeof PostMenu> = {
  component: PostMenu,
};

export default meta;
type Story = StoryObj<typeof PostMenu>;

const menuList: MenuItem[] = [
  { color: 'black', content: '닉네임 신고', action: 'nicknameReport' },
  { color: 'black', content: '게시글 신고', action: 'postReport' },
];

export const Default: Story = {
  render: () => <PostMenu menuList={menuList} handleMenuClick={() => {}} />,
};
