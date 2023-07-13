import type { Meta, StoryObj } from '@storybook/react';

import NarrowOriginHeader from '.';

const meta: Meta<typeof NarrowOriginHeader> = {
  component: NarrowOriginHeader,
  decorators: [storyFn => <div style={{ width: '576px', position: 'relative' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof NarrowOriginHeader>;

export const Primary: Story = {
  render: () => <NarrowOriginHeader />,
};
