import type { Meta, StoryObj } from '@storybook/react';

import PopularPost from '.';

const meta: Meta<typeof PopularPost> = {
  component: PopularPost,
};

export default meta;
type Story = StoryObj<typeof PopularPost>;

export const Default: Story = {
  render: () => <PopularPost />,
};
