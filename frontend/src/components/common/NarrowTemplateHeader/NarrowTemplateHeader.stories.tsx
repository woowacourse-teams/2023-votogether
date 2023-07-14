import type { Meta, StoryObj } from '@storybook/react';

import NarrowTemplateHeader from '.';

const meta: Meta<typeof NarrowTemplateHeader> = {
  component: NarrowTemplateHeader,
  decorators: [storyFn => <div style={{ width: '576px', position: 'relative' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof NarrowTemplateHeader>;

export const BothSideHeader: Story = {
  render: () => (
    <NarrowTemplateHeader>
      <div style={{ width: '30px', backgroundColor: 'red' }}>예시</div>
      <div style={{ width: '30px', backgroundColor: 'yellow' }}>예시</div>
    </NarrowTemplateHeader>
  ),
};

export const ThreeComponentHeaderLeft: Story = {
  render: () => (
    <NarrowTemplateHeader>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ width: '30px', backgroundColor: 'red' }}>예시</div>
        <div style={{ width: '30px', backgroundColor: 'white' }}>예시</div>
      </div>
      <div style={{ width: '30px', backgroundColor: 'yellow' }}>예시</div>
    </NarrowTemplateHeader>
  ),
};

export const ThreeComponentHeaderRight: Story = {
  render: () => (
    <NarrowTemplateHeader>
      <div style={{ width: '30px', backgroundColor: 'red' }}>예시</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ width: '30px', backgroundColor: 'white' }}>예시</div>
        <div style={{ width: '30px', backgroundColor: 'yellow' }}>예시</div>
      </div>
    </NarrowTemplateHeader>
  ),
};
