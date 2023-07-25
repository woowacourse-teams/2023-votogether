import type { Meta, StoryObj } from '@storybook/react';

import TagButton from '.';

const meta: Meta<typeof TagButton> = {
  component: TagButton,
  decorators: [storyFn => <div style={{ width: '100px', height: '50px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof TagButton>;

export const SizeS: Story = {
  render: () => <TagButton size="sm">조기마감</TagButton>,
};

export const sizeM: Story = {
  render: () => <TagButton size="md">조기마감</TagButton>,
};

export const sizeL: Story = {
  render: () => <TagButton size="lg">조기마감</TagButton>,
};
