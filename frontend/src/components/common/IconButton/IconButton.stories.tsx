import type { Meta, StoryObj } from '@storybook/react';

import IconButton from '.';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Category: Story = {
  render: () => (
    <div style={{ backgroundColor: 'black' }}>
      <IconButton category="category" />
    </div>
  ),
};

export const Back: Story = {
  render: () => (
    <div style={{ backgroundColor: 'black' }}>
      <IconButton category="back" />
    </div>
  ),
};

export const Search: Story = {
  render: () => (
    <div style={{ backgroundColor: 'black' }}>
      <IconButton category="search" />
    </div>
  ),
};

export const Retry: Story = {
  render: () => <IconButton category="retry" />,
};

export const Alarm: Story = {
  render: () => <IconButton category="alarm" />,
};

export const Ranking: Story = {
  render: () => <IconButton category="ranking" />,
};
