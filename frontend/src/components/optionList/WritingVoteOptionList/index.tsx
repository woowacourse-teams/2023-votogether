import React from 'react';

import { styled } from 'styled-components';

import WritingVoteOption from './WritingVoteOption';

interface WritingVoteOptionType {
  id: number;
  text: string;
  imageUrl?: string;
}

interface WritingVoteOptionListProps {
  optionList: WritingVoteOptionType[];
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function WritingVoteOptionList({ optionList }: WritingVoteOptionListProps) {
  const isDeletable = optionList.length > 2;
  return (
    <Container>
      {optionList.map(optionItem => (
        <WritingVoteOption
          key={optionItem.id}
          isDeletable={isDeletable}
          text={optionItem.text}
          imageUrl={optionItem.imageUrl}
        />
      ))}
      {optionList.length < 5 && <button>더하기</button>}
    </Container>
  );
}
