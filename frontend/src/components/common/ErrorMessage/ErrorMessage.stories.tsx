import type { Meta, StoryObj } from '@storybook/react';

import ErrorMessage from '.';

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage,
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  render: () => <ErrorMessage errorHandler={() => {}} />,
};
