import type { Meta, StoryObj } from '@storybook/react';

import LoginPage from '.';

const meta: Meta<typeof LoginPage> = {
  component: LoginPage,
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {
  render: () => <LoginPage />,
};
