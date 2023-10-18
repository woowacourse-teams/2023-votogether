import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_TRANSFORM_NOTICE } from '@mocks/mockData/notice';

import NoticeItem from '.';

const meta: Meta<typeof NoticeItem> = {
  component: NoticeItem,
  decorators: [storyFn => <div style={{ width: '576px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof NoticeItem>;

export const Default: Story = {
  render: () => <NoticeItem notice={MOCK_TRANSFORM_NOTICE} />,
};
