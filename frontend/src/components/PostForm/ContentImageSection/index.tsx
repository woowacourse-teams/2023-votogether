import { ChangeEvent, MutableRefObject } from 'react';

import { Size } from '@type/style';

import OptionCancelButton from '@components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton';

import * as S from './style';

interface ContentImageSectionProps {
  size: Size;
  contentImageHook: {
    contentImage: string;
    contentInputRef: MutableRefObject<HTMLInputElement | null>;
    removeImage: () => void;
    handleUploadImage: (event: ChangeEvent<HTMLInputElement>) => void;
  };
}
export default function ContentImageSection({ contentImageHook, size }: ContentImageSectionProps) {
  const { contentImage, contentInputRef, removeImage, handleUploadImage } = contentImageHook;

  return (
    <>
      {contentImage && (
        <S.ContentImageContainer>
          <OptionCancelButton onClick={removeImage} />
          <S.ContentImageWrapper $size={size}>
            <S.ContentImage src={contentImage} alt="본문에 포함된 사진" />
          </S.ContentImageWrapper>
        </S.ContentImageContainer>
      )}
      {
        <S.FileInputContainer>
          <S.Button type="button" $isVisible={!!contentImage} aria-label="본문 이미지 업로드">
            <S.Label htmlFor="content-image-upload">본문에 사진 넣기</S.Label>
          </S.Button>
          <S.FileInput
            id="content-image-upload"
            ref={contentInputRef}
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            tabIndex={-1}
          />
        </S.FileInputContainer>
      }
    </>
  );
}
