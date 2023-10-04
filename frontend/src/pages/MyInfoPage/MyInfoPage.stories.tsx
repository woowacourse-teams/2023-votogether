import type { Meta, StoryObj } from '@storybook/react';

import MyInfoPage from '.';

const meta: Meta<typeof MyInfoPage> = {
  component: MyInfoPage,
};

export default meta;
type Story = StoryObj<typeof MyInfoPage>;

export const Default: Story = {
  render: () => <MyInfoPage />,
};
