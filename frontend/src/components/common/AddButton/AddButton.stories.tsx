import type { Meta, StoryObj } from '@storybook/react';

import AddButton from '.';

const meta: Meta<typeof AddButton> = {
  component: AddButton,
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const SizeS: Story = {
  render: () => <AddButton size="sm" aria-label="글 작성하기" />,
};

export const SizeM: Story = {
  render: () => <AddButton size="md" aria-label="글 작성하기" />,
};

export const SizeL: Story = {
  render: () => <AddButton size="lg" aria-label="글 작성하기" />,
};
