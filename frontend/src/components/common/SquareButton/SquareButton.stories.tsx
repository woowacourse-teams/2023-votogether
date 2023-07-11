import type { Meta, StoryObj } from '@storybook/react';

import SquareButton from '.';

const meta: Meta<typeof SquareButton> = {
  component: SquareButton,
  decorators: [storyFn => <div style={{ width: '100px', height: '50px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof SquareButton>;

export const color_blank: Story = {
  render: () => <SquareButton theme="blank">확 인</SquareButton>,
};

export const color_fill: Story = {
  render: () => <SquareButton theme="fill">버 튼</SquareButton>,
};
