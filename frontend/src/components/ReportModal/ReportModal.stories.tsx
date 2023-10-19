import type { Meta, StoryObj } from '@storybook/react';

import ReportModal from '.';

const meta: Meta<typeof ReportModal> = {
  component: ReportModal,
};

export default meta;
type Story = StoryObj<typeof ReportModal>;

export const Nickname: Story = {
  render: () => (
    <ReportModal
      handleModalClose={() => {}}
      reportType="NICKNAME"
      handleCancelClick={() => {}}
      handleReportClick={() => {}}
      isReportLoading={false}
    />
  ),
};

export const Comment: Story = {
  render: () => (
    <ReportModal
      handleModalClose={() => {}}
      reportType="COMMENT"
      handleCancelClick={() => {}}
      handleReportClick={() => {}}
      isReportLoading={false}
    />
  ),
};

export const Post: Story = {
  render: () => (
    <ReportModal
      handleModalClose={() => {}}
      reportType="POST"
      handleCancelClick={() => {}}
      handleReportClick={() => {}}
      isReportLoading={false}
    />
  ),
};
