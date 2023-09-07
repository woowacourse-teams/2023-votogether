import type { Meta, StoryObj } from '@storybook/react';

import InstallPrompt from '.';

const meta: Meta<typeof InstallPrompt> = {
  component: InstallPrompt,
};

export default meta;
type Story = StoryObj<typeof InstallPrompt>;

export const Default: Story = {
  render: () => <InstallPrompt handleInstallClick={() => {}} handleCancelClick={() => {}} />,
};
