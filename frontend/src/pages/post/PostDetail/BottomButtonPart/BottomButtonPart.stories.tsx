import type { LoadingType } from '../types';
import type { Meta, StoryObj } from '@storybook/react';

import BottomButtonPart from '.';

const meta: Meta<typeof BottomButtonPart> = {
  component: BottomButtonPart,
};

const handleEvent = {
  movePage: {
    moveWritePostPage: () => {},
    moveVoteStatisticsPage: () => {},
    movePostListPage: () => {},
  },
  controlPost: {
    setEarlyClosePost: () => {},
    deletePost: () => {},
    reportPost: (reason: string) => {},
    reportNickname: (reason: string) => {},
  },
  openToast: () => {},
};

export default meta;
type Story = StoryObj<typeof BottomButtonPart>;

const isEventLoading: Record<LoadingType, boolean> = {
  isDeletePostLoading: false,
  isReportPostLoading: false,
  isReportNicknameLoading: false,
};

export const isWriterAndIsClosedCase: Story = {
  render: () => (
    <BottomButtonPart
      isWriter={true}
      isClosed={true}
      handleEvent={handleEvent}
      isEventLoading={isEventLoading}
    />
  ),
};

export const isNotWriterAndIsClosedCase: Story = {
  render: () => (
    <BottomButtonPart
      isWriter={false}
      isClosed={true}
      handleEvent={handleEvent}
      isEventLoading={isEventLoading}
    />
  ),
};

export const isWriterAndIsNotClosedCase: Story = {
  render: () => (
    <BottomButtonPart
      isWriter={true}
      isClosed={false}
      handleEvent={handleEvent}
      isEventLoading={isEventLoading}
    />
  ),
};

export const isNotWriterAndIsNotClosedCase: Story = {
  render: () => (
    <BottomButtonPart
      isWriter={false}
      isClosed={false}
      handleEvent={handleEvent}
      isEventLoading={isEventLoading}
    />
  ),
};
