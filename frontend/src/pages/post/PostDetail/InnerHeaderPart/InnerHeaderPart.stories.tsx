import type { Meta, StoryObj } from '@storybook/react';

import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';

import InnerHeaderPart from '.';

const meta: Meta<typeof InnerHeaderPart> = {
  component: InnerHeaderPart,
  decorators: [storyFn => <NarrowTemplateHeader>{storyFn()}</NarrowTemplateHeader>],
};

const handleEvent = {
  movePage: {
    moveWritePostPage: () => {},
    moveVoteStatisticsPage: () => {},
    movePostListPage: () => {},
  },
  controlPost: {
    setEarlyClosePost: () => {},
    removePost: () => {},
    reportPost: (reason: string) => {},
    reportNickname: (reason: string) => {},
  },
};

export default meta;
type Story = StoryObj<typeof InnerHeaderPart>;

export const isWriterAndIsClosedCase: Story = {
  render: () => <InnerHeaderPart isWriter={true} isClosed={true} handleEvent={handleEvent} />,
};

export const isNotWriterAndIsClosedCase: Story = {
  render: () => <InnerHeaderPart isWriter={false} isClosed={true} handleEvent={handleEvent} />,
};

export const isWriterAndIsNotClosedCase: Story = {
  render: () => <InnerHeaderPart isWriter={true} isClosed={false} handleEvent={handleEvent} />,
};

export const isNotWriterAndIsNotClosedCase: Story = {
  render: () => <InnerHeaderPart isWriter={false} isClosed={false} handleEvent={handleEvent} />,
};
