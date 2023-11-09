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
  const { drawerRef, openDrawer, closeDrawer } = useDrawer('left', 'drawer-category-toast-content');

  return (
    <div>
      <NarrowMainHeader handleCategoryOpenClick={openDrawer} handleAlarmOpenClick={() => {}} />
      <Drawer
        toastContentId="drawer-category-toast-content"
        width="225px"
        handleDrawerClose={closeDrawer}
        placement="left"
        ref={drawerRef}
      >
        <Dashboard />
      </Drawer>
    </div>
  );
};

export const RightSideBar = () => {
  const { drawerRef, openDrawer, closeDrawer } = useDrawer('right', 'drawer-alarm-toast-content');

  return (
    <div>
      <NarrowMainHeader handleCategoryOpenClick={openDrawer} handleAlarmOpenClick={() => {}} />
      <Drawer
        toastContentId="drawer-alarm-toast-content"
        width="225px"
        handleDrawerClose={closeDrawer}
        placement="right"
        ref={drawerRef}
      >
        <Dashboard />
      </Drawer>
    </div>
  );
};
