import type { Meta, StoryObj } from '@storybook/react';

import AdminNoticeTableFetcher from '.';

const meta: Meta<typeof AdminNoticeTableFetcher> = {
  component: AdminNoticeTableFetcher,
};

export default meta;
type Story = StoryObj<typeof AdminNoticeTableFetcher>;

export const Default: Story = {
  render: () => <AdminNoticeTableFetcher />,
};
