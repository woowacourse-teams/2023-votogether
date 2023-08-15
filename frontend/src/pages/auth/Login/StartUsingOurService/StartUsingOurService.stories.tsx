import type { Meta, StoryObj } from '@storybook/react';

import StartUsingOurService from '.';

const meta: Meta<typeof StartUsingOurService> = {
  component: StartUsingOurService,
};

export default meta;
type Story = StoryObj<typeof StartUsingOurService>;

export const Default: Story = {
  render: () => <StartUsingOurService />,
};
