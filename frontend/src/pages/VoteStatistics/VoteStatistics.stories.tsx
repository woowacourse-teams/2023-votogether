import type { Meta, StoryObj } from '@storybook/react';

import VoteStatisticsPage from '.';

const meta: Meta<typeof VoteStatisticsPage> = {
  component: VoteStatisticsPage,
};

export default meta;
type Story = StoryObj<typeof VoteStatisticsPage>;

export const DefaultPage: Story = {
  render: () => <VoteStatisticsPage />,
};
