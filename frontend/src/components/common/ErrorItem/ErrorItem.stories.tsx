import type { Meta, StoryObj } from '@storybook/react';

import ErrorItem from '.';

const meta: Meta<typeof ErrorItem> = {
  component: ErrorItem,
  args: {
    text: '에러메세지를 작성할 수 있습니다.',
    haveIcon: true,
    retryInteraction: true,
    homeInteraction: true,
  },
  argTypes: {
    haveIcon: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
    retryInteraction: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
    homeInteraction: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorItem>;

export const Default: Story = {
  render: args => <ErrorItem {...args} />,
};
