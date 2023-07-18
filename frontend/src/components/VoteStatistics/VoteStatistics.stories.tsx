import type { Meta, StoryObj } from '@storybook/react';

import { mockVoteResult } from './mockData';

import VoteStatistics from '.';

const meta: Meta<typeof VoteStatistics> = {
  component: VoteStatistics,
};

export default meta;
type Story = StoryObj<typeof VoteStatistics>;

export const SizeSm: Story = {
  render: () => <VoteStatistics size="sm" voteResult={mockVoteResult} />,
};

export const SizeMd: Story = {
  render: () => <VoteStatistics size="md" voteResult={mockVoteResult} />,
};

export const SizeLg: Story = {
  render: () => <VoteStatistics size="lg" voteResult={mockVoteResult} />,
};
