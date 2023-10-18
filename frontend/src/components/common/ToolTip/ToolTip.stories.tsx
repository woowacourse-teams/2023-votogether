import type { Meta } from '@storybook/react';

import ToolTip from '.';

const meta: Meta<typeof ToolTip> = {
  component: ToolTip,
};

export default meta;

export const SizeS = () => {
  return (
    <ToolTip size="sm">
      <div style={{ width: '100px', height: '100px', backgroundColor: 'bisque' }} />
    </ToolTip>
  );
};

export const SizeM = () => {
  return (
    <ToolTip size="md">
      <div style={{ width: '100px', height: '100px', backgroundColor: 'bisque' }} />
    </ToolTip>
  );
};

export const SizeL = () => {
  return (
    <ToolTip size="lg">
      <div style={{ width: '100px', height: '100px', backgroundColor: 'bisque' }} />
    </ToolTip>
  );
};

export const SizeFree = () => {
  return (
    <ToolTip size="free">
      <div style={{ width: '50vw', height: '90vh', backgroundColor: 'bisque' }} />
    </ToolTip>
  );
};
