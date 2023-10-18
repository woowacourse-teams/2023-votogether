import type { Meta } from '@storybook/react';

import { useDrawer } from '@hooks/useDrawer';

import Dashboard from '../Dashboard';
import NarrowMainHeader from '../NarrowMainHeader';

import Drawer from '.';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
};

export default meta;

export const LeftSideBar = () => {
  const { drawerRef, openDrawer, closeDrawer } = useDrawer('left');

  return (
    <div>
      <NarrowMainHeader handleCategoryOpenClick={openDrawer} handleAlarmOpenClick={() => {}} />
      <Drawer width="225px" handleDrawerClose={closeDrawer} placement="left" ref={drawerRef}>
        <Dashboard />
      </Drawer>
    </div>
  );
};

export const RightSideBar = () => {
  const { drawerRef, openDrawer, closeDrawer } = useDrawer('right');

  return (
    <div>
      <NarrowMainHeader handleCategoryOpenClick={openDrawer} handleAlarmOpenClick={() => {}} />
      <Drawer width="225px" handleDrawerClose={closeDrawer} placement="right" ref={drawerRef}>
        <Dashboard />
      </Drawer>
    </div>
  );
};
