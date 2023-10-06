import type { Meta, StoryObj } from '@storybook/react';

import { PostMenuItem } from '@type/menu';

import PostMenu from '.';

const meta: Meta<typeof PostMenu> = {
  component: PostMenu,
};

export default meta;
type Story = StoryObj<typeof PostMenu>;

const menuList: PostMenuItem[] = [
  { color: 'black', content: '닉네임 신고', action: 'NICKNAME_REPORT' },
  { color: 'black', content: '게시글 신고', action: 'POST_REPORT' },
  { color: 'black', content: '방구', action: 'DELETE' },
];

export const Default: Story = {
  render: () => <PostMenu menuList={menuList} handleMenuClick={() => {}} />,
};
