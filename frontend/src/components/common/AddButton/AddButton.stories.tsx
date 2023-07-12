import type { Meta, StoryObj } from '@storybook/react';

import AddButton from '.';

const meta: Meta<typeof AddButton> = {
  component: AddButton,
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const size_S: Story = {
  render: () => <AddButton size="sm" />,
};

export const size_M: Story = {
  render: () => <AddButton size="md" />,
};

export const size_L: Story = {
  render: () => <AddButton size="lg" />,
};
