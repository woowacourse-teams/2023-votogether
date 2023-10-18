import type { Meta, StoryObj } from '@storybook/react';

import NoticeEditPage from '.';

const meta: Meta<typeof NoticeEditPage> = {
  component: NoticeEditPage,
};

export default meta;
type Story = StoryObj<typeof NoticeEditPage>;

export const Default: Story = {
  render: () => <NoticeEditPage />,
};
