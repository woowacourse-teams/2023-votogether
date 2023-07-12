import React from 'react';

import ProgressBar from './ProgressBar';
import * as S from './style';

interface WrittenVoteOptionProps {
  handleVoteClick: () => void;
  text: string;
  isVoted: boolean;
  peopleCount: number;
  percent: number;
  isSelected: boolean;
  isPreview: boolean;
  imageUrl?: string;
}

export default function WrittenVoteOption({
  handleVoteClick,
  text,
  isVoted,
  peopleCount,
  percent,
  isSelected,
  isPreview,
  imageUrl,
}: WrittenVoteOptionProps) {
  return (
    <S.Container isSelected={isSelected} onClick={handleVoteClick}>
      {!isPreview && imageUrl && <S.Image src={imageUrl} alt={text} />}
      {isPreview ? (
        <S.PreviewContent>{text}</S.PreviewContent>
      ) : (
        <S.DetailContent>{text}</S.DetailContent>
      )}
      {isVoted && (
        <>
          <S.ProgressContainer>
            <ProgressBar percent={percent} isSelected={isSelected} />
          </S.ProgressContainer>
          <S.TextContainer>
            <S.PeopleText>{peopleCount}명</S.PeopleText>
            <S.PercentText>({percent.toFixed(1)}%)</S.PercentText>
          </S.TextContainer>
        </>
      )}
    </S.Container>
  );
}
