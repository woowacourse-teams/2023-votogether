import type { Meta, StoryObj } from '@storybook/react';

import EditPostPage from '.';

const meta: Meta<typeof EditPostPage> = {
  component: EditPostPage,
};

export default meta;
type Story = StoryObj<typeof EditPostPage>;

export const Default: Story = {
  render: () => <EditPostPage />,
};
