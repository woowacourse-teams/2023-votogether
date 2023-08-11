import type { Meta, StoryObj } from '@storybook/react';

import MobileInstallPrompt from '.';

const meta: Meta<typeof MobileInstallPrompt> = {
  component: MobileInstallPrompt,
};

export default meta;
type Story = StoryObj<typeof MobileInstallPrompt>;

export const Android: Story = {
  render: () => (
    <MobileInstallPrompt
      platform="android"
      handleInstallClick={() => {}}
      handleCancelClick={() => {}}
    />
  ),
};

export const Ios: Story = {
  render: () => (
    <MobileInstallPrompt
      platform="ios"
      handleInstallClick={() => {}}
      handleCancelClick={() => {}}
    />
  ),
};
