import React, { ChangeEvent } from 'react';

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

const MAX_WRITING_LENGTH = 50;

export default function WritingVoteOption({
  optionId,
  text,
  isDeletable,
  handleDeleteOptionClick,
  handleRemoveImageClick,
  handleUploadImageChange,
  imageUrl,
}: WritingVoteOptionProps) {
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    const standard = value.length;

    if (standard === MAX_WRITING_LENGTH) {
      event.target.setCustomValidity(`선택지 내용은 ${MAX_WRITING_LENGTH}자까지 입력 가능합니다.`);
      event.target.reportValidity();
      return;
    }

    event.target.setCustomValidity('');
  };
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
            onChange={handleTextChange}
            placeholder="내용을 입력해주세요."
            rows={2}
            maxLength={MAX_WRITING_LENGTH}
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
