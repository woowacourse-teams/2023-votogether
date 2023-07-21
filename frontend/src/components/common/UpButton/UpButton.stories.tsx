import type { Meta, StoryObj } from '@storybook/react';

import UpButton from '.';

const meta: Meta<typeof UpButton> = {
  component: UpButton,
};

export default meta;
type Story = StoryObj<typeof UpButton>;

export const Default: Story = {
  render: () => <UpButton />,
};
