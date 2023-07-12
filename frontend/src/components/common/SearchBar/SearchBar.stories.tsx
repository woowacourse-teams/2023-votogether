import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from '.';

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const size_sm: Story = {
  render: () => <SearchBar size="sm" />,
};

export const size_md: Story = {
  render: () => <SearchBar size="md" />,
};

export const size_lg: Story = {
  render: () => <SearchBar size="lg" />,
};

export const size_free: Story = {
  render: () => <SearchBar size="free" />,
};
