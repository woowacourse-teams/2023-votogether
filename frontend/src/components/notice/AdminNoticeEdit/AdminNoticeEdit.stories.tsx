import type { Meta, StoryObj } from '@storybook/react';

import AdminNoticeEdit from '.';

const meta: Meta<typeof AdminNoticeEdit> = {
  component: AdminNoticeEdit,
};

export default meta;
type Story = StoryObj<typeof AdminNoticeEdit>;

export const Default: Story = {
  render: () => <AdminNoticeEdit />,
};
