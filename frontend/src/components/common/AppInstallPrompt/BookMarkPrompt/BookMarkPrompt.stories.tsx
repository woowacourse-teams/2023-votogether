import type { Meta, StoryObj } from '@storybook/react';

import BookMarkPrompt from '.';

const meta: Meta<typeof BookMarkPrompt> = {
  component: BookMarkPrompt,
};

export default meta;
type Story = StoryObj<typeof BookMarkPrompt>;

export const Default: Story = {
  render: () => <BookMarkPrompt handleCancelClick={() => {}} />,
};
