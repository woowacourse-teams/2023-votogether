import type { Meta, StoryObj } from '@storybook/react';

import MobileInstallPrompt from '.';

const meta: Meta<typeof MobileInstallPrompt> = {
  component: MobileInstallPrompt,
};

export default meta;
type Story = StoryObj<typeof MobileInstallPrompt>;

export const Default: Story = {
  render: () => <MobileInstallPrompt />,
};
