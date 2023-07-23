import type { Meta, StoryObj } from '@storybook/react';

import LoadingSpinner from '.';

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const SizeS: Story = {
  render: () => <LoadingSpinner size="sm" />,
};

export const SizeM: Story = {
  render: () => <LoadingSpinner size="md" />,
};

export const SizeL: Story = {
  render: () => <LoadingSpinner size="lg" />,
};
