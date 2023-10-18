import type { Meta, StoryObj } from '@storybook/react';

import NoticeDetailPage from '.';

const meta: Meta<typeof NoticeDetailPage> = {
  component: NoticeDetailPage,
};

export default meta;
type Story = StoryObj<typeof NoticeDetailPage>;

export const Default: Story = {
  render: () => <NoticeDetailPage />,
};
