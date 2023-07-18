import type { Meta, StoryObj } from '@storybook/react';

import AddButton from '.';

const meta: Meta<typeof AddButton> = {
  component: AddButton,
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const SizeS: Story = {
  render: () => <AddButton size="sm" />,
};

export const sizeM: Story = {
  render: () => <AddButton size="md" />,
};

export const sizeL: Story = {
  render: () => <AddButton size="lg" />,
};
