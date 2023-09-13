import type { Meta, StoryObj } from '@storybook/react';

import Login from '.';

const meta: Meta<typeof Login> = {
  component: Login,
};

export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {
  render: () => <Login />,
};
