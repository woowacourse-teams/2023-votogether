import type { Meta, StoryObj } from '@storybook/react';

import PendingReportPage from '.';

const meta: Meta<typeof PendingReportPage> = {
  component: PendingReportPage,
};

export default meta;
type Story = StoryObj<typeof PendingReportPage>;

export const Default: Story = {
  render: () => <PendingReportPage />,
};
