import type { Meta, StoryObj } from '@storybook/react';

import ErrorItem from '.';

const meta: Meta<typeof ErrorItem> = {
  component: ErrorItem,
  args: {
    text: '에러메세지를 작성할 수 있습니다.',
    hasIcon: true,
    hasRetryInteraction: true,
    hasHomeInteraction: true,
  },
  argTypes: {
    hasIcon: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
    hasRetryInteraction: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
    hasHomeInteraction: {
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
