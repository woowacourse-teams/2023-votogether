import type { Meta, StoryObj } from '@storybook/react';

import { RankingPost } from '@type/ranking';

import PopularPost from '.';

const meta: Meta<typeof PopularPost> = {
  component: PopularPost,
};

export default meta;
type Story = StoryObj<typeof PopularPost>;

const rankingPostInfo: RankingPost = {
  rank: 1,
  post: {
    id: 29,
    writer: 'writer',
    title: '이것은 엄청나게 많은 투표가 이루어진 대단한 글이지요',
    voteCount: 10,
  },
};
const rankingPostList: RankingPost[] = new Array(10)
  .fill(rankingPostInfo)
  .map((post, index) => ({ ...post, ranking: index + 1 }));

export const Default: Story = {
  render: () => <PopularPost rankingPostList={rankingPostList} />,
};
