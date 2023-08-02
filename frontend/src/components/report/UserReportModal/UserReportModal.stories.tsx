import type { Meta, StoryObj } from '@storybook/react';

import UserReportModal from '.';

const meta: Meta<typeof UserReportModal> = {
  component: UserReportModal,
};

export default meta;
type Story = StoryObj<typeof UserReportModal>;

export const Default: Story = {
  render: () => <UserReportModal handleCancelClick={() => {}} />,
};
