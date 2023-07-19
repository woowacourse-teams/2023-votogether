import type { Meta } from '@storybook/react';

import { Category } from '@type/category';
import { User } from '@type/user';

import { useDrawer } from '@hooks/useDrawer';

import Dashboard from '../Dashboard';
import NarrowMainHeader from '../NarrowMainHeader';

import Drawer from '.';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
};

export default meta;

const MOCK_USER_INFO: User = {
  nickname: '우아한 코끼리',
  postCount: 4,
  voteCount: 128,
  userPoint: 200,
};

const MOCK_CATEGORIES: Category[] = [
  { id: 12312, name: '음식', isFavorite: false },
  { id: 12, name: '연애', isFavorite: false },
  { id: 13, name: '패션', isFavorite: false },
  { id: 14, name: '금융', isFavorite: false },
];

export const LeftSideBar = () => {
  const { drawerRef, openDrawer, closeDrawer } = useDrawer('left');

  return (
    <div>
      <NarrowMainHeader handleMenuOpenClick={openDrawer} />
      <Drawer width="225px" handleDrawerClose={closeDrawer} placement="left" ref={drawerRef}>
        <Dashboard
          userInfo={MOCK_USER_INFO}
          categoryList={MOCK_CATEGORIES}
          handleFavoriteClick={() => {}}
          handleLogoutClick={() => {}}
        />
      </Drawer>
    </div>
  );
};

export const RightSideBar = () => {
  const { drawerRef, openDrawer, closeDrawer } = useDrawer('right');

  return (
    <div>
      <NarrowMainHeader handleMenuOpenClick={openDrawer} />
      <Drawer width="225px" handleDrawerClose={closeDrawer} placement="right" ref={drawerRef}>
        <Dashboard
          userInfo={MOCK_USER_INFO}
          categoryList={MOCK_CATEGORIES}
          handleFavoriteClick={() => {}}
          handleLogoutClick={() => {}}
        />
      </Drawer>
    </div>
  );
};
