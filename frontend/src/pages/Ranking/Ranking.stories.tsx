import type { Meta, StoryObj } from '@storybook/react';

import Ranking from '.';

const meta: Meta<typeof Ranking> = {
  component: Ranking,
};

export default meta;
type Story = StoryObj<typeof Ranking>;

export const Default: Story = {
  render: () => <Ranking />,
};
