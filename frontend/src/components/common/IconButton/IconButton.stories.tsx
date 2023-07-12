import type { Meta, StoryObj } from '@storybook/react';

import IconButton from '.';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  decorators: [storyFn => <div style={{ backgroundColor: 'black' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const category: Story = {
  render: () => <IconButton category="category" />,
};

export const back: Story = {
  render: () => <IconButton category="back" />,
};

export const search: Story = {
  render: () => <IconButton category="search" />,
};
