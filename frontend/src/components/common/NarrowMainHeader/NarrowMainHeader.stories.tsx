import type { Meta, StoryObj } from '@storybook/react';

import NarrowMainHeader from '.';

const meta: Meta<typeof NarrowMainHeader> = {
  component: NarrowMainHeader,
  decorators: [storyFn => <div style={{ width: '576px', position: 'relative' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof NarrowMainHeader>;

export const Primary: Story = {
  render: () => (
    <NarrowMainHeader handleCategoryOpenClick={() => {}} handleAlarmOpenClick={() => {}} />
  ),
};
