import React from 'react';

import ProgressBar from './ProgressBar';
import * as S from './style';

interface WrittenVoteOptionProps {
  onClick: () => void;
  text: string;
  isVote: boolean;
  peopleCount: number;
  percent: number;
  isSelect: boolean;
  isPreview: boolean;
  imageUrl?: string;
}

export default function WrittenVoteOption({
  onClick,
  text,
  isVote,
  peopleCount,
  percent,
  isSelect,
  isPreview,
  imageUrl,
}: WrittenVoteOptionProps) {
  return (
    <S.Container aria-label={text} isSelect={isSelect} onClick={onClick}>
      {imageUrl && <S.Image src={imageUrl} alt={text} />}
      {isPreview ? (
        <S.PreviewContent>{text}</S.PreviewContent>
      ) : (
        <S.DetailContent>{text}</S.DetailContent>
      )}
      {isVote && (
        <>
          <S.ProgressContainer>
            <ProgressBar percent={percent} isSelect={isSelect} />
          </S.ProgressContainer>
          <S.TextContainer>
            <S.PeopleText>{peopleCount}명</S.PeopleText>
            <S.PercentText>({percent.toFixed(0)}%)</S.PercentText>
          </S.TextContainer>
        </>
      )}
    </S.Container>
  );
}
