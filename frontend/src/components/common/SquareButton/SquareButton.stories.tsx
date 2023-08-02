import type { Meta, StoryObj } from '@storybook/react';

import SquareButton from '.';

const meta: Meta<typeof SquareButton> = {
  component: SquareButton,
  decorators: [storyFn => <div style={{ width: '100px', height: '50px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof SquareButton>;

export const ColorBlank: Story = {
  render: () => <SquareButton theme="blank">확 인</SquareButton>,
};

export const ColorFill: Story = {
  render: () => <SquareButton theme="fill">버 튼</SquareButton>,
};

export const ColorGray: Story = {
  render: () => <SquareButton theme="gray">버 튼</SquareButton>,
};
