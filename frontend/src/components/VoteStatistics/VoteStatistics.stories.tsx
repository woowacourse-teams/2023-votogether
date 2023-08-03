import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_VOTE_RESULT } from '@mocks/mockData/voteResult';

import VoteStatistics from '.';

const meta: Meta<typeof VoteStatistics> = {
  component: VoteStatistics,
};

export default meta;
type Story = StoryObj<typeof VoteStatistics>;

export const SizeSm: Story = {
  render: () => <VoteStatistics size="sm" voteResultResponse={MOCK_VOTE_RESULT} />,
};

export const SizeMd: Story = {
  render: () => <VoteStatistics size="md" voteResultResponse={MOCK_VOTE_RESULT} />,
};

export const SizeLg: Story = {
  render: () => <VoteStatistics size="lg" voteResultResponse={MOCK_VOTE_RESULT} />,
};
