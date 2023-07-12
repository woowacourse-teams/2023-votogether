import type { Meta, StoryObj } from '@storybook/react';

import { styled } from 'styled-components';

import WritingVoteOptionList from '.';

const meta: Meta<typeof WritingVoteOptionList> = {
  component: WritingVoteOptionList,
};

export default meta;
type Story = StoryObj<typeof WritingVoteOptionList>;

const ListWrapper = styled.div`
  width: 100%;
  max-width: 320px;
`;

const MOCK_MAX_VOTE_OPTION = [
  { id: 1234123, text: '', imageUrl: '' },
  { id: 1234177, text: '', imageUrl: '' },
  {
    id: 1234221,
    text: '방학 때 강릉으로  강아지와 기차여행을 하려했지만 장마가 와서 취소했어요. 여행을 별로 좋',
    imageUrl: '',
  },
  {
    id: 1834221,
    text: '방학 때 강릉으로  강아지와 기차여행을 하려했지만 장마가 와서 취소했어요. 여행을 별로 좋',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    id: 1234451,
    text: '',
    imageUrl: 'https://source.unsplash.com/random',
  },
];

const MOCK_MIN_VOTE_OPTION = [
  { id: 123741, text: '', imageUrl: '' },
  { id: 123415, text: '', imageUrl: '' },
];

export const DefaultOptionList: Story = {
  render: () => (
    <ListWrapper>
      <WritingVoteOptionList />
    </ListWrapper>
  ),
};

export const MaxCountOptionList: Story = {
  render: () => (
    <ListWrapper>
      <WritingVoteOptionList initialOptionList={MOCK_MAX_VOTE_OPTION} />
    </ListWrapper>
  ),
};

export const MinCountOptionList: Story = {
  render: () => (
    <ListWrapper>
      <WritingVoteOptionList initialOptionList={MOCK_MIN_VOTE_OPTION} />
    </ListWrapper>
  ),
};
