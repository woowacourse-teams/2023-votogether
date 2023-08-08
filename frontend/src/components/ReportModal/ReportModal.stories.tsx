import type { Meta, StoryObj } from '@storybook/react';

import ReportModal from '.';

const meta: Meta<typeof ReportModal> = {
  component: ReportModal,
};

export default meta;
type Story = StoryObj<typeof ReportModal>;

export const Nickname: Story = {
  render: () => (
    <ReportModal reportType="NICKNAME" handleCancelClick={() => {}} handleReportClick={() => {}} />
  ),
};

export const Comment: Story = {
  render: () => (
    <ReportModal reportType="COMMENT" handleCancelClick={() => {}} handleReportClick={() => {}} />
  ),
};

export const Post: Story = {
  render: () => (
    <ReportModal reportType="POST" handleCancelClick={() => {}} handleReportClick={() => {}} />
  ),
};
