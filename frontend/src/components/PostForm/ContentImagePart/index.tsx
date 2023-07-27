import { useContentImage } from '@hooks/useContentImage';

import OptionCancelButton from '@components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton';

import * as S from './style';

export default function ContentImagePart({ imageUrl }: { imageUrl?: string }) {
  const { contentImage, removeImage, handleUploadImage } = useContentImage(imageUrl);

  return (
    <>
      <S.ContentImageContainer $isVisible={!!contentImage}>
        <OptionCancelButton onClick={removeImage} />
        <S.ContentImageWrapper>
          <S.ContentImage src={contentImage} alt={'본문에 포함된 사진'} />
        </S.ContentImageWrapper>
      </S.ContentImageContainer>
      <S.FileInputContainer $isVisible={!contentImage}>
        <S.Label
          htmlFor="content-image-upload"
          aria-label="본문 이미지 업로드 버튼"
          title="이미지 업로드"
        >
          본문에 사진 넣기
        </S.Label>
        <S.FileInput
          id="content-image-upload"
          type="file"
          accept="image/*"
          onChange={handleUploadImage}
        />
      </S.FileInputContainer>
    </>
  );
}
