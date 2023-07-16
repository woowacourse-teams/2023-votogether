import type { Meta, StoryObj } from '@storybook/react';

import { mockVoteResult } from '../mockData';

import TwoLineGraph from '.';

const meta: Meta<typeof TwoLineGraph> = {
  component: TwoLineGraph,
};

export default meta;
type Story = StoryObj<typeof TwoLineGraph>;

export const SizeSm: Story = {
  render: () => <TwoLineGraph size="sm" voteResult={mockVoteResult} />,
};

export const SizeMd: Story = {
  render: () => <TwoLineGraph size="md" voteResult={mockVoteResult} />,
};

export const SizeLg: Story = {
  render: () => <TwoLineGraph size="lg" voteResult={mockVoteResult} />,
};
