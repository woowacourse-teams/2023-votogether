import type { Meta, StoryObj } from '@storybook/react';

import IconButton from '../IconButton';

import ActiveContainer from '.';

const meta: Meta<typeof ActiveContainer> = {
  component: ActiveContainer,
  decorators: [
    storyFn => (
      <div style={{ width: '100%', height: '100px', backgroundColor: 'black' }}>{storyFn()}</div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ActiveContainer>;

export const Active: Story = {
  render: () => (
    <ActiveContainer isActive={true}>
      <IconButton category="alarm" />
    </ActiveContainer>
  ),
};

export const NotActive: Story = {
  render: () => (
    <ActiveContainer isActive={false}>
      <IconButton category="ranking" />
    </ActiveContainer>
  ),
};
