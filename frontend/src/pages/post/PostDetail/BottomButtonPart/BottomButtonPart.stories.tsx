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
    reportPost: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof BottomButtonPart>;

export const isWriterAndIsClosedCase: Story = {
  render: () => <BottomButtonPart isWriter={true} isClosed={true} handleEvent={handleEvent} />,
};

export const isNotWriterAndIsClosedCase: Story = {
  render: () => <BottomButtonPart isWriter={false} isClosed={true} handleEvent={handleEvent} />,
};

export const isWriterAndIsNotClosedCase: Story = {
  render: () => <BottomButtonPart isWriter={true} isClosed={false} handleEvent={handleEvent} />,
};

export const isNotWriterAndIsNotClosedCase: Story = {
  render: () => <BottomButtonPart isWriter={false} isClosed={false} handleEvent={handleEvent} />,
};
