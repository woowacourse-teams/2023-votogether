import type { Meta, StoryObj } from '@storybook/react';

import WideHeader from '.';

const meta: Meta<typeof WideHeader> = {
  component: WideHeader,
};

export default meta;
type Story = StoryObj<typeof WideHeader>;

export const Primary: Story = {
  render: () => <WideHeader />,
};
