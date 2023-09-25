import type { Meta, StoryObj } from '@storybook/react';

import NotFoundPage from '.';

const meta: Meta<typeof NotFoundPage> = {
  component: NotFoundPage,
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const Default: Story = {
  render: () => <NotFoundPage />,
};
