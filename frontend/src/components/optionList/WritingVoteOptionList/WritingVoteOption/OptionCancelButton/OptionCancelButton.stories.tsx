import type { Meta, StoryObj } from '@storybook/react';

import OptionCancelButton from '.';

const meta: Meta<typeof OptionCancelButton> = {
  component: OptionCancelButton,
};

export default meta;
type Story = StoryObj<typeof OptionCancelButton>;

export const Default: Story = {
  render: () => <OptionCancelButton />,
};
