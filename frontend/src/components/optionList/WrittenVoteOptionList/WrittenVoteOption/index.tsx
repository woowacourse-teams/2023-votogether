import { MouseEvent } from 'react';

import ProgressBar from './ProgressBar';
import * as S from './style';

interface WrittenVoteOptionProps {
  handleVoteClick: () => void;
  handleImageClick?: (event: MouseEvent<HTMLImageElement>) => void;
  text: string;
  isStatisticsVisible: boolean;
  peopleCount: number;
  percent: number;
  isSelected: boolean;
  isPreview: boolean;
  imageUrl: string;
  ariaLabel: string;
}

export default function WrittenVoteOption({
  handleVoteClick,
  handleImageClick,
  text,
  isStatisticsVisible,
  peopleCount,
  percent,
  isSelected,
  isPreview,
  imageUrl,
  ariaLabel,
}: WrittenVoteOptionProps) {
  return (
    <S.Container
      aria-live={isSelected ? 'polite' : 'off'}
      aria-label={ariaLabel}
      $isSelected={isSelected}
      onClick={handleVoteClick}
    >
      {!isPreview && imageUrl && (
        <S.Image onClick={handleImageClick} src={imageUrl} alt={'선택지에 포함된 이미지'} />
      )}
      {isPreview ? (
        <S.PreviewContent>{text}</S.PreviewContent>
      ) : (
        <S.DetailContent>{text}</S.DetailContent>
      )}
      {isStatisticsVisible && (
        <>
          <S.ProgressContainer>
            <ProgressBar percent={percent} isSelected={isSelected} />
          </S.ProgressContainer>
          <S.TextContainer>
            <S.PeopleText aria-hidden="true">{peopleCount}명</S.PeopleText>
            <S.PercentText aria-hidden="true">({percent.toFixed(1)}%)</S.PercentText>
          </S.TextContainer>
        </>
      )}
    </S.Container>
  );
}
