import { convertImageUrlToServerUrl } from '@utils/post/convertImageUrlToServerUrl';

import ProgressBar from './ProgressBar';
import * as S from './style';

interface WrittenVoteOptionProps {
  handleVoteClick: () => void;
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
      aria-label={`${ariaLabel}${isSelected ? '선택된 선택지' : ''}`}
      $isSelected={isSelected}
      onClick={handleVoteClick}
    >
      {!isPreview && imageUrl && (
        <S.Image src={`${convertImageUrlToServerUrl(imageUrl)}`} alt={'선택지에 포함된 이미지'} />
      )}
      {isPreview ? (
        <S.PreviewContent aria-label="선택지 내용">{text}</S.PreviewContent>
      ) : (
        <S.DetailContent aria-label="선택지 내용">{text}</S.DetailContent>
      )}
      {isStatisticsVisible && (
        <>
          <S.ProgressContainer aria-label={''}>
            <ProgressBar percent={percent} isSelected={isSelected} />
          </S.ProgressContainer>
          <S.TextContainer>
            <S.PeopleText aria-label="투표한 인원">{peopleCount}명</S.PeopleText>
            <S.PercentText aria-label="전체 투표 중 차지 비율">
              ({percent.toFixed(1)}%)
            </S.PercentText>
          </S.TextContainer>
        </>
      )}
    </S.Container>
  );
}
