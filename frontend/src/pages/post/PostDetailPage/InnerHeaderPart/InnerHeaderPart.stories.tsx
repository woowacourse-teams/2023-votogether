import type { Meta, StoryObj } from '@storybook/react';

import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';

import { LoadingType } from '../types';

import InnerHeaderPart from '.';

const meta: Meta<typeof InnerHeaderPart> = {
  component: InnerHeaderPart,
  decorators: [storyFn => <NarrowTemplateHeader>{storyFn()}</NarrowTemplateHeader>],
};

export default meta;
type Story = StoryObj<typeof InnerHeaderPart>;

const isEventLoading: Record<LoadingType, boolean> = {
  isDeletePostLoading: false,
  isReportPostLoading: false,
  isReportNicknameLoading: false,
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

export const isWriterAndIsClosedCase: Story = {
  render: () => (
    <InnerHeaderPart
      isWriter={true}
      isClosed={true}
      handleEvent={handleEvent}
      isEventLoading={isEventLoading}
    />
  ),
};

export const isNotWriterAndIsClosedCase: Story = {
  render: () => (
    <InnerHeaderPart
      isWriter={false}
      isClosed={true}
      handleEvent={handleEvent}
      isEventLoading={isEventLoading}
    />
  ),
};

export const isWriterAndIsNotClosedCase: Story = {
  render: () => (
    <InnerHeaderPart
      isWriter={true}
      isClosed={false}
      handleEvent={handleEvent}
      isEventLoading={isEventLoading}
    />
  ),
};

export const isNotWriterAndIsNotClosedCase: Story = {
  render: () => (
    <InnerHeaderPart
      isWriter={false}
      isClosed={false}
      handleEvent={handleEvent}
      isEventLoading={isEventLoading}
    />
  ),
};
