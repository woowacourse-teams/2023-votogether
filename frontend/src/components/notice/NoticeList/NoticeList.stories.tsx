import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_TRANSFORM_NOTICE_LIST } from '@mocks/mockData/notice';

import NoticeList from '.';

const meta: Meta<typeof NoticeList> = {
  component: NoticeList,
  decorators: [storyFn => <div style={{ width: '576px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof NoticeList>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '100vw', padding: '15px' }}>
      <NoticeList noticeList={MOCK_TRANSFORM_NOTICE_LIST.noticeList} />
    </div>
  ),
};
