import type { Meta, StoryObj } from '@storybook/react';

import IconButton from '.';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  decorators: [storyFn => <div style={{ backgroundColor: 'black' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const categoryIconButton: Story = {
  render: () => <IconButton category="category" clickEvent={() => {}} />,
};

export const backIconButton: Story = {
  render: () => <IconButton category="back" clickEvent={() => {}} />,
};

export const searchIconButton: Story = {
  render: () => <IconButton category="search" clickEvent={() => {}} />,
};
