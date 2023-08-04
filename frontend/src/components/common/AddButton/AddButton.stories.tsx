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

export const SizeM: Story = {
  render: () => <AddButton size="md" />,
};

export const SizeL: Story = {
  render: () => <AddButton size="lg" />,
};
