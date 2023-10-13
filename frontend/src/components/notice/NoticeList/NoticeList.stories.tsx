import type { Meta, StoryObj } from '@storybook/react';

import NoticeList from '.';

const meta: Meta<typeof NoticeList> = {
  component: NoticeList,
  decorators: [storyFn => <div style={{ width: '576px' }}>{storyFn()}</div>],
};

const MOCK_NOTICE_LIST = [
  {
    id: 1,
    title: '방방뛰는 코끼리 엄청나게 긴 게시글 공지사항입니다.',
    createdAt: '2022-01-11 12:23',
  },
  {
    id: 2,
    title: '방방뛰는 코끼리',
    createdAt: '2022-01-11 12:23',
  },
  {
    id: 3,
    title: '방방뛰는 코끼리',
    createdAt: '2022-01-11 12:23',
  },
  {
    id: 4,
    title: '방방뛰는 코끼리',
    createdAt: '2022-01-11 12:23',
  },
  {
    id: 5,
    title: '방방뛰는 코끼리',
    createdAt: '2022-01-11 12:23',
  },
];

export default meta;
type Story = StoryObj<typeof NoticeList>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '100vw', padding: '15px' }}>
      <NoticeList noticeList={MOCK_NOTICE_LIST} />
    </div>
  ),
};
