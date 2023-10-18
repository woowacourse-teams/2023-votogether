import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_TRANSFORM_NOTICE } from '@mocks/mockData/notice';

import NoticeDetail from '.';

const meta: Meta<typeof NoticeDetail> = {
  component: NoticeDetail,
};

export default meta;
type Story = StoryObj<typeof NoticeDetail>;

export const Default: Story = {
  render: () => <NoticeDetail notice={MOCK_TRANSFORM_NOTICE} />,
};
