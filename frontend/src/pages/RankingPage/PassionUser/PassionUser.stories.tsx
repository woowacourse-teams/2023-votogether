import type { Meta, StoryObj } from '@storybook/react';

import PassionUserRanking from '.';

const meta: Meta<typeof PassionUserRanking> = {
  component: PassionUserRanking,
};

export default meta;
type Story = StoryObj<typeof PassionUserRanking>;

export const User: Story = {
  render: () => <PassionUserRanking />,
};

export const Guest: Story = {
  render: () => <PassionUserRanking />,
};
