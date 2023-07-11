import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from '.';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Selected: Story = {
  render: () => <ProgressBar percent={20} isSelected={true} />,
};

export const NotSelected: Story = {
  render: () => <ProgressBar percent={20} isSelected={false} />,
};
