import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from '.';

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const SizeSm: Story = {
  render: () => <SearchBar size="sm" />,
};

export const SizeMd: Story = {
  render: () => <SearchBar size="md" />,
};

export const SizeLg: Story = {
  render: () => <SearchBar size="lg" />,
};

export const SizeFree: Story = {
  render: () => <SearchBar size="free" />,
};
