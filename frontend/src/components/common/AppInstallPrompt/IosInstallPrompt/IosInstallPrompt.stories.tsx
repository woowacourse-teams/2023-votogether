import type { Meta, StoryObj } from '@storybook/react';

import IosInstallPrompt from '.';

const meta: Meta<typeof IosInstallPrompt> = {
  component: IosInstallPrompt,
};

export default meta;
type Story = StoryObj<typeof IosInstallPrompt>;

export const Default: Story = {
  render: () => <IosInstallPrompt handleCancelClick={() => {}} />,
};
