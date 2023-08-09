import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from '.';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton isLarge={true} />,
};

export const FirstBoxLarge: Story = {
  render: () => <Skeleton isLarge={false} />,
};
