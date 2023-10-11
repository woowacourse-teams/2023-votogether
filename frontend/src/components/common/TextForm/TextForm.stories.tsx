import type { Meta, StoryObj } from '@storybook/react';

import TextForm from '.';

const meta: Meta<typeof TextForm> = {
  component: TextForm,
};

export default meta;
type Story = StoryObj<typeof TextForm>;

export const Default: Story = {
  render: () => <TextForm />,
};
