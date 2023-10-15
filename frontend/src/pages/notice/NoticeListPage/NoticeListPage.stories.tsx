import type { Meta, StoryObj } from '@storybook/react';

import NoticeListPage from '.';

const meta: Meta<typeof NoticeListPage> = {
  component: NoticeListPage,
};

export default meta;
type Story = StoryObj<typeof NoticeListPage>;

export const Default: Story = {
  render: () => <NoticeListPage />,
};
