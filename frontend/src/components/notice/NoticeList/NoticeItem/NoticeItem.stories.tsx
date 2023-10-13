import type { Meta, StoryObj } from '@storybook/react';

import NoticeItem from '.';

const meta: Meta<typeof NoticeItem> = {
  component: NoticeItem,
  decorators: [storyFn => <div style={{ width: '576px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof NoticeItem>;

const MOCK_NOTICE_ITEM = {
  id: 1,
  title: '방방뛰는 코끼리',
  createdAt: '2022-01-11 12:23',
};

export const Default: Story = {
  render: () => <NoticeItem {...MOCK_NOTICE_ITEM} />,
};
