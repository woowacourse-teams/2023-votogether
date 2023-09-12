import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_DETAIL_VOTE_RESULT } from '@mocks/mockData/voteResult';

import TwoLineGraph from '.';

const meta: Meta<typeof TwoLineGraph> = {
  component: TwoLineGraph,
};

export default meta;
type Story = StoryObj<typeof TwoLineGraph>;

export const SizeSm: Story = {
  render: () => <TwoLineGraph size="sm" ageGroup={MOCK_DETAIL_VOTE_RESULT} />,
};

export const SizeMd: Story = {
  render: () => <TwoLineGraph size="md" ageGroup={MOCK_DETAIL_VOTE_RESULT} />,
};

export const SizeLg: Story = {
  render: () => <TwoLineGraph size="lg" ageGroup={MOCK_DETAIL_VOTE_RESULT} />,
};
