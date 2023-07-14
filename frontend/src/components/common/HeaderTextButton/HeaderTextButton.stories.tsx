import type { Meta, StoryObj } from '@storybook/react';

import HeaderTextButton from '.';

const meta: Meta<typeof HeaderTextButton> = {
  component: HeaderTextButton,
};

export default meta;
type Story = StoryObj<typeof HeaderTextButton>;

export const DefaultButton: Story = {
  render: () => <HeaderTextButton>확 인</HeaderTextButton>,
};
