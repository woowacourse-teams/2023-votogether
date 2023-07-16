import type { Meta } from '@storybook/react';

import { useEffect, useRef } from 'react';

import { Category } from '@type/category';
import { User } from '@type/user';

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
  { id: 12312, name: '음식', favorite: false },
  { id: 12, name: '연애', favorite: false },
  { id: 13, name: '패션', favorite: false },
  { id: 14, name: '금융', favorite: false },
];

export const LeftSideBar = () => {
  const drawerRef = useRef<HTMLDialogElement>(null);

  const handleMenuOpenClick = () => {
    if (!drawerRef.current) return;

    drawerRef.current.showModal();
    drawerRef.current.style.transform = 'translateX(0)';
  };

  const handleMenuClose = async () => {
    if (!drawerRef.current) return;
    drawerRef.current.style.transform = 'translateX(-100%)';

    setTimeout(() => {
      if (!drawerRef.current) return;

      drawerRef.current.close();
    }, 300);
  };

  useEffect(() => {
    if (!drawerRef.current) return;

    drawerRef.current.style.transform = 'translateX(-100%)';
  }, []);

  return (
    <div>
      <NarrowMainHeader handleMenuOpenClick={handleMenuOpenClick} />
      <Drawer width="225px" handleDrawerClose={handleMenuClose} placement="left" ref={drawerRef}>
        <Dashboard
          user={MOCK_USER_INFO}
          categoryList={MOCK_CATEGORIES}
          handleFavoriteClick={() => {}}
          handleLogoutClick={() => {}}
        />
      </Drawer>
    </div>
  );
};

export const RightSideBar = () => {
  const drawerRef = useRef<HTMLDialogElement>(null);

  const handleMenuOpenClick = () => {
    if (!drawerRef.current) return;

    drawerRef.current.showModal();
    drawerRef.current.style.transform = 'translateX(0)';
  };

  const handleMenuClose = async () => {
    if (!drawerRef.current) return;
    drawerRef.current.style.transform = 'translateX(100%)';

    setTimeout(() => {
      if (!drawerRef.current) return;

      drawerRef.current.close();
    }, 300);
  };

  useEffect(() => {
    if (!drawerRef.current) return;

    drawerRef.current.style.transform = 'translateX(100%)';
  }, []);

  return (
    <div>
      <NarrowMainHeader handleMenuOpenClick={handleMenuOpenClick} />
      <Drawer width="225px" handleDrawerClose={handleMenuClose} placement="right" ref={drawerRef}>
        <Dashboard
          user={MOCK_USER_INFO}
          categoryList={MOCK_CATEGORIES}
          handleFavoriteClick={() => {}}
          handleLogoutClick={() => {}}
        />
      </Drawer>
    </div>
  );
};
