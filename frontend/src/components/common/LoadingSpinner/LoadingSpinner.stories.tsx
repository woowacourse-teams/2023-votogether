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

export const sizeM: Story = {
  render: () => <LoadingSpinner size="md" />,
};

export const sizeL: Story = {
  render: () => <LoadingSpinner size="lg" />,
};
