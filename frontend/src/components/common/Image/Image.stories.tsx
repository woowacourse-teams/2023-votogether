import type { Meta, StoryObj } from '@storybook/react';

import Image from '.';

const meta: Meta<typeof Image> = {
  component: Image,
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Category: Story = {
  render: () => (
    <Image src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FE2Q2S%2FbtswcHwhtdY%2FCKuiznZAZeKA72CyK0c8Y0%2Fimg.png" />
  ),
};
