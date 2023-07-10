import type { Meta, StoryObj } from '@storybook/react';

import AddButton from '.';

const meta: Meta<typeof AddButton> = {
  component: AddButton,
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const size_S: Story = {
  render: () => <AddButton size="S" />,
};

export const size_M: Story = {
  render: () => <AddButton size="M" />,
};

export const size_L: Story = {
  render: () => <AddButton size="L" />,
};
