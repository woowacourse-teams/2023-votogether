import type { Meta, StoryObj } from '@storybook/react';

import IconButton from '.';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  decorators: [storyFn => <div style={{ backgroundColor: 'black' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Category: Story = {
  render: () => <IconButton category="category" />,
};

export const Back: Story = {
  render: () => <IconButton category="back" />,
};

export const Search: Story = {
  render: () => <IconButton category="search" />,
};
