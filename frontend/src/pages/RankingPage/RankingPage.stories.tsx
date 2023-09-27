import type { Meta, StoryObj } from '@storybook/react';

import RankingPage from '.';

const meta: Meta<typeof RankingPage> = {
  component: RankingPage,
};

export default meta;
type Story = StoryObj<typeof RankingPage>;

export const Default: Story = {
  render: () => <RankingPage />,
};
