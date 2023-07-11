import type { Meta, StoryObj } from '@storybook/react';

import OptionUploadImageButton from '.';

const meta: Meta<typeof OptionUploadImageButton> = {
  component: OptionUploadImageButton,
};

export default meta;
type Story = StoryObj<typeof OptionUploadImageButton>;

export const Default: Story = {
  render: () => <OptionUploadImageButton />,
};
