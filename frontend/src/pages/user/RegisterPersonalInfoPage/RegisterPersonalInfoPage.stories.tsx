import type { Meta, StoryObj } from '@storybook/react';

import RegisterPersonalInfoPage from '.';

const meta: Meta<typeof RegisterPersonalInfoPage> = {
  component: RegisterPersonalInfoPage,
};

export default meta;
type Story = StoryObj<typeof RegisterPersonalInfoPage>;

export const Default: Story = {
  render: () => <RegisterPersonalInfoPage />,
};
