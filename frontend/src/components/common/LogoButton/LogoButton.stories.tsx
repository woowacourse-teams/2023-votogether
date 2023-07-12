import type { Meta, StoryObj } from '@storybook/react';

import LogoButton from '.';

const meta: Meta<typeof LogoButton> = {
  component: LogoButton,
  decorators: [
    storyFn => <div style={{ backgroundColor: 'black', height: '100px' }}>{storyFn()}</div>,
  ],
};

export default meta;
type Story = StoryObj<typeof LogoButton>;

export const icon: Story = {
  render: () => <LogoButton inclusion="icon" />,
};

export const text: Story = {
  render: () => <LogoButton inclusion="text" />,
};

export const full: Story = {
  render: () => <LogoButton inclusion="full" />,
};
