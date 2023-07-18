import type { Meta, StoryObj } from '@storybook/react';

import OptionStatistics from '.';

const meta: Meta<typeof OptionStatistics> = {
  component: OptionStatistics,
  // decorators: [storyFn => <div style={{ width: '360px' }}>{storyFn()}</div>],
};

export default meta;
type Story = StoryObj<typeof OptionStatistics>;

const MOCK_MAX_VOTE_OPTION = {
  id: 2,
  text: '',
  imageUrl: 'https://source.unsplash.com/random',
  peopleCount: 10,
  percent: 10,
};

export const defaultPage: Story = {
  render: () => (
    <OptionStatistics
      postId={1}
      voteOption={MOCK_MAX_VOTE_OPTION}
      isSelectedOption={true}
      size="sm"
    />
  ),
};
