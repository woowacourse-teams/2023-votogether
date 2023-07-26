import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from '../Skeleton';

import Layout from '.';

const meta: Meta<typeof Layout> = {
  component: Layout,
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const VisibleCategory: Story = {
  render: () => (
    <Layout isSidebarVisible={true}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Layout>
  ),
};

export const HiddenCategory: Story = {
  render: () => (
    <Layout isSidebarVisible={false}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Layout>
  ),
};
