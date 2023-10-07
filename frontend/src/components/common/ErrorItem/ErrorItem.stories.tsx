import type { Meta, StoryObj } from '@storybook/react';

import ErrorItem from '.';

const meta: Meta<typeof ErrorItem> = {
  component: ErrorItem,
};

export default meta;
type Story = StoryObj<typeof ErrorItem>;

export const Default: Story = {
  render: () => <ErrorItem />,
};
