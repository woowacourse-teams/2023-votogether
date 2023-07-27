import OptionCancelButton from '@components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton';

import * as S from './style';

export default function ContentImagePart({
  imageUrl = '',
  isImageVisible,
}: {
  imageUrl?: string;
  isImageVisible?: boolean;
}) {
  return imageUrl ? (
    <S.ContentImagePart>
      <OptionCancelButton />
      <S.ContentImageContainer>
        <S.ContentImage src={'https://source.unsplash.com/random'} alt={'본문에 포함된 사진'} />
      </S.ContentImageContainer>
    </S.ContentImagePart>
  ) : (
    <S.Container $isVisible={true}>
      <S.Label
        htmlFor="content-image-upload"
        aria-label="본문 이미지 업로드 버튼"
        title="이미지 업로드"
      >
        본문에 사진 넣기
      </S.Label>
      <S.FileInput id="content-image-upload" type="file" accept="image/*" />
    </S.Container>
  );
}
