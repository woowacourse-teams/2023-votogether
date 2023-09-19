import type { Meta, StoryObj } from '@storybook/react';

import Banner from '.';

const meta: Meta<typeof Banner> = {
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Primary: Story = {
  render: () => (
    <Banner
      title="이것은 배너에 포함될 제목입니다."
      content="그리고 이것은 배너에 포함될 내용입니다."
      handleClose={() => {}}
      path="/"
    />
  ),
};
