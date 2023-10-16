import type { Meta } from '@storybook/react';

import { CSSProperties } from 'react';

import AlarmContainer from '.';

const meta: Meta<typeof AlarmContainer> = {
  component: AlarmContainer,
};

export default meta;

export const Default = () => {
  return <AlarmContainer closeToolTip={() => {}} />;
};

const style: CSSProperties = {
  maxHeight: '500px',
  overflow: 'scroll',
};

export const LimitHeight = () => {
  return <AlarmContainer closeToolTip={() => {}} style={style} />;
};
