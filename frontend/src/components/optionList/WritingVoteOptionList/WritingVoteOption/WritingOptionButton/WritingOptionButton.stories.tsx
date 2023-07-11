import type { Meta, StoryObj } from '@storybook/react';

import WritingOptionButton from '.';

const meta: Meta<typeof WritingOptionButton> = {
  component: WritingOptionButton,
};

export default meta;
type Story = StoryObj<typeof WritingOptionButton>;

export const Cancel: Story = {
  render: () => <WritingOptionButton kind="cancel" />,
};

export const UploadImage: Story = {
  render: () => <WritingOptionButton kind="uploadImage" />,
};
