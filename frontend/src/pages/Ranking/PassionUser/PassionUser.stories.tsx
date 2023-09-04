import type { Meta, StoryObj } from '@storybook/react';

import { PassionUser } from '@type/ranking';

import PassionUserRanking from '.';

const meta: Meta<typeof PassionUserRanking> = {
  component: PassionUserRanking,
};

export default meta;
type Story = StoryObj<typeof PassionUserRanking>;

const rankerInfo: PassionUser = {
  rank: 1,
  nickname: 'gil-dong',
  postCount: 11,
  voteCount: 79,
  score: 134,
};

const userRankingInfo: PassionUser = {
  rank: 1111,
  nickname: 'wow',
  postCount: 1,
  voteCount: 3,
  score: 8,
};

const rankerList: PassionUser[] = new Array(10)
  .fill(rankerInfo)
  .map((ranker, index) => ({ ...ranker, rank: index + 1 }));

export const User: Story = {
  render: () => <PassionUserRanking rankerList={rankerList} userRanking={userRankingInfo} />,
};

export const Guest: Story = {
  render: () => <PassionUserRanking rankerList={rankerList} />,
};
