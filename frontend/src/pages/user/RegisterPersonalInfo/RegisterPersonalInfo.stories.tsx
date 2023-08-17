import type { Meta, StoryObj } from '@storybook/react';

import RegisterPersonalInfo from '.';

const meta: Meta<typeof RegisterPersonalInfo> = {
  component: RegisterPersonalInfo,
};

export default meta;
type Story = StoryObj<typeof RegisterPersonalInfo>;

export const Default: Story = {
  render: () => <RegisterPersonalInfo />,
};
