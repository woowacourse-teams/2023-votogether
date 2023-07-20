import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_VOTE_RESULT } from '@mocks/mockData/voteResult';

import OneLineGraph from '.';

const meta: Meta<typeof OneLineGraph> = {
  component: OneLineGraph,
};

export default meta;
type Story = StoryObj<typeof OneLineGraph>;

export const SizeSm: Story = {
  render: () => <OneLineGraph size="sm" voteResult={MOCK_VOTE_RESULT} />,
};

export const SizeMd: Story = {
  render: () => <OneLineGraph size="md" voteResult={MOCK_VOTE_RESULT} />,
};

export const SizeLg: Story = {
  render: () => <OneLineGraph size="lg" voteResult={MOCK_VOTE_RESULT} />,
};
