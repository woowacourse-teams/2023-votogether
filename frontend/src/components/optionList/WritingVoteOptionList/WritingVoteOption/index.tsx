import React from 'react';

import OptionCancelButton from './OptionCancelButton';
import OptionUploadImageButton from './OptionUploadImageButton';
import * as S from './style';

interface WritingVoteOptionProps {
  optionId: number;
  text: string;
  isDeletable: boolean;
  handleDeleteOptionClick: () => void;
  handleRemoveImageClick: () => void;
  handleUploadImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string;
}

export default function WritingVoteOption({
  optionId,
  text,
  isDeletable,
  handleDeleteOptionClick,
  handleRemoveImageClick,
  handleUploadImageChange,
  imageUrl,
}: WritingVoteOptionProps) {
  return (
    <S.Container>
      {isDeletable && (
        <div title="선택지 삭제하기">
          <OptionCancelButton onClick={handleDeleteOptionClick} />
        </div>
      )}
      <S.OptionContainer>
        <S.ContentContainer>
          <S.ContentTextArea
            defaultValue={text}
            placeholder="내용을 입력해주세요."
            rows={2}
            maxLength={50}
          />
          {!imageUrl && (
            <OptionUploadImageButton labelId={optionId} onChange={handleUploadImageChange} />
          )}
        </S.ContentContainer>
        {imageUrl && (
          <S.ImageContainer>
            <S.Image src={imageUrl} alt={text} />
            <S.ImageCancelWrapper>
              <OptionCancelButton onClick={handleRemoveImageClick} />
            </S.ImageCancelWrapper>
          </S.ImageContainer>
        )}
      </S.OptionContainer>
    </S.Container>
  );
}
