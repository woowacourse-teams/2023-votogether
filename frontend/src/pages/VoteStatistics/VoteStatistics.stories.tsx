import type { Meta, StoryObj } from '@storybook/react';

import VoteStatisticsPage from '.';

const meta: Meta<typeof VoteStatisticsPage> = {
  component: VoteStatisticsPage,
  // decorators: [storyFn => <div style={{ width: '360px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof VoteStatisticsPage>;

export const defaultPage: Story = {
  render: () => <VoteStatisticsPage />,
};
