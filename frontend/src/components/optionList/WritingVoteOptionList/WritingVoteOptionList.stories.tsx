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
  { id: 12341, text: '', imageUrl: '' },
  { id: 12341, text: '', imageUrl: '' },
  {
    id: 1234221,
    text: '방학 때 강릉으로  강아지와 기차여행을 하려했지만 장마가 와서 취소했어요. 여행을 별로 좋',
    imageUrl: '',
  },
  {
    id: 1234221,
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
  { id: 12341, text: '', imageUrl: '' },
  { id: 12341, text: '', imageUrl: '' },
];

export const MaxCountOptionList: Story = {
  render: () => (
    <ListWrapper>
      <WritingVoteOptionList optionList={MOCK_MAX_VOTE_OPTION} />
    </ListWrapper>
  ),
};

export const MinCountOptionList: Story = {
  render: () => (
    <ListWrapper>
      <WritingVoteOptionList optionList={MOCK_MIN_VOTE_OPTION} />
    </ListWrapper>
  ),
};
