import type { Meta, StoryObj } from '@storybook/react';

import NoticeAdminPage from '.';

const meta: Meta<typeof NoticeAdminPage> = {
  component: NoticeAdminPage,
};

export default meta;
type Story = StoryObj<typeof NoticeAdminPage>;

export const Default: Story = {
  render: () => <NoticeAdminPage />,
};
