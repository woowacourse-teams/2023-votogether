import type { Meta, StoryObj } from '@storybook/react';

import NoticeWritePage from '.';

const meta: Meta<typeof NoticeWritePage> = {
  component: NoticeWritePage,
};

export default meta;
type Story = StoryObj<typeof NoticeWritePage>;

export const Default: Story = {
  render: () => <NoticeWritePage />,
};
