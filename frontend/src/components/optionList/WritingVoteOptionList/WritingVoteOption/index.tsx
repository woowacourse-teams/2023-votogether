import { ChangeEvent } from 'react';

import { POST_OPTION_POLICY } from '@constants/policyMessage';

import OptionCancelButton from './OptionCancelButton';
import OptionUploadImageButton from './OptionUploadImageButton';
import * as S from './style';

interface WritingVoteOptionProps {
  optionId: number;
  text: string;
  isDeletable: boolean;
  ariaLabel: string;
  handleUpdateOptionChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleDeleteOptionClick: () => void;
  handleRemoveImageClick: () => void;
  handleUploadImage: (event: ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
}

const MAX_WRITING_LENGTH = 50;

export default function WritingVoteOption({
  optionId,
  text,
  isDeletable,
  ariaLabel,
  handleUpdateOptionChange,
  handleDeleteOptionClick,
  handleRemoveImageClick,
  handleUploadImage,
  imageUrl,
}: WritingVoteOptionProps) {
  return (
    <S.Container aria-label={ariaLabel}>
      <S.CancelButtonWrapper>
        {isDeletable && (
          <OptionCancelButton title="선택지 삭제하기" onClick={handleDeleteOptionClick} />
        )}
      </S.CancelButtonWrapper>
      <S.OptionContainer>
        <S.ContentContainer>
          <S.ContentTextArea
            name="optionText"
            defaultValue={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleUpdateOptionChange(e)}
            placeholder={POST_OPTION_POLICY.DEFAULT}
            maxLength={MAX_WRITING_LENGTH}
          />

          <OptionUploadImageButton
            isImageVisible={imageUrl.length > 0}
            optionId={optionId}
            onChange={handleUploadImage}
          />
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
