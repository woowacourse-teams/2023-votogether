import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from '.';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Select: Story = {
  render: () => <ProgressBar percent={20} isSelect={true} />,
};

export const NotSelect: Story = {
  render: () => <ProgressBar percent={20} isSelect={false} />,
};
