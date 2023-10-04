import type { Meta } from '@storybook/react';

import { styled } from 'styled-components';

import { useWritingOption } from '@hooks';

import WritingVoteOptionList from '.';

const meta: Meta<typeof WritingVoteOptionList> = {
  component: WritingVoteOptionList,
};

export default meta;

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

export const DefaultOptionList = () => {
  const writingOptionHook = useWritingOption();

  return (
    <ListWrapper>
      <WritingVoteOptionList writingOptionHook={writingOptionHook} />
    </ListWrapper>
  );
};

export const MaxCountOptionList = () => {
  const writingOptionHook = useWritingOption(MOCK_MAX_VOTE_OPTION);

  return (
    <ListWrapper>
      <WritingVoteOptionList writingOptionHook={writingOptionHook} />
    </ListWrapper>
  );
};

export const MinCountOptionList = () => {
  const writingOptionHook = useWritingOption(MOCK_MIN_VOTE_OPTION);

  return (
    <ListWrapper>
      <WritingVoteOptionList writingOptionHook={writingOptionHook} />
    </ListWrapper>
  );
};
