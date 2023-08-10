import type { Meta, StoryObj } from '@storybook/react';

import NotFound from '.';

const meta: Meta<typeof NotFound> = {
  component: NotFound,
};

export default meta;
type Story = StoryObj<typeof NotFound>;

export const Default: Story = {
  render: () => <NotFound />,
};
