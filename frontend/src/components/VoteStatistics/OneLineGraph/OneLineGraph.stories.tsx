import type { Meta, StoryObj } from '@storybook/react';

import { mockVoteResult } from '../mockData';

import OneLineGraph from '.';

const meta: Meta<typeof OneLineGraph> = {
  component: OneLineGraph,
};

export default meta;
type Story = StoryObj<typeof OneLineGraph>;

export const SizeSm: Story = {
  render: () => <OneLineGraph size="sm" voteResult={mockVoteResult} />,
};

export const SizeMd: Story = {
  render: () => <OneLineGraph size="md" voteResult={mockVoteResult} />,
};

export const SizeLg: Story = {
  render: () => <OneLineGraph size="lg" voteResult={mockVoteResult} />,
};
