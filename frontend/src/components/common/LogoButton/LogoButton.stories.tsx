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

export const Icon: Story = {
  render: () => <LogoButton content="icon" />,
};

export const Text: Story = {
  render: () => <LogoButton content="text" />,
};

export const Full: Story = {
  render: () => <LogoButton content="full" />,
};
