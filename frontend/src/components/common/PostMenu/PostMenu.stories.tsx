import type { Meta, StoryObj } from '@storybook/react';

import { COMMENT_MENU } from '../../comment/CommentList/constants';

import PostMenu from '.';

const meta: Meta<typeof PostMenu> = {
  component: PostMenu,
};

export default meta;
type Story = StoryObj<typeof PostMenu>;

export const WriterUser: Story = {
  render: () => <PostMenu menuList={COMMENT_MENU.WRITER} handleMenuClick={() => {}} />,
};

export const NotWriterUser: Story = {
  render: () => <PostMenu menuList={COMMENT_MENU.NOT_WRITER} handleMenuClick={() => {}} />,
};
