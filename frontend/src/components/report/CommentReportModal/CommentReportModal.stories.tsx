import type { Meta, StoryObj } from '@storybook/react';

import CommentReportModal from '.';

const meta: Meta<typeof CommentReportModal> = {
  component: CommentReportModal,
};

export default meta;
type Story = StoryObj<typeof CommentReportModal>;

export const Default: Story = {
  render: () => <CommentReportModal handleCancelClick={() => {}} />,
};
