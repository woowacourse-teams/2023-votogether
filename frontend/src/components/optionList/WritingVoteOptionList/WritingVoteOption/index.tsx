import { ChangeEvent, ClipboardEvent, MutableRefObject } from 'react';

import { POST_WRITING_OPTION } from '@constants/policy';
import { POST_OPTION_POLICY } from '@constants/policyMessage';

import OptionCancelButton from './OptionCancelButton';
import OptionUploadImageButton from './OptionUploadImageButton';
import * as S from './style';

interface WritingVoteOptionProps {
  optionId: number;
  text: string;
  isDeletable: boolean;
  ariaLabel: string;
  handleUpdateOptionChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleDeleteOptionClick: () => void;
  handleRemoveImageClick: () => void;
  handleUploadImage: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePasteImage: (event: ClipboardEvent<HTMLTextAreaElement>) => void;
  imageUrl: string;
  contentInputRefList: MutableRefObject<HTMLInputElement[]>;
  index: number;
}

export default function WritingVoteOption({
  optionId,
  text,
  isDeletable,
  ariaLabel,
  handleUpdateOptionChange,
  handleDeleteOptionClick,
  handleRemoveImageClick,
  handleUploadImage,
  handlePasteImage,
  imageUrl,
  contentInputRefList,
  index,
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
            onChange={handleUpdateOptionChange}
            onPaste={handlePasteImage}
            placeholder={POST_OPTION_POLICY.DEFAULT}
            maxLength={POST_WRITING_OPTION.MAX_LENGTH}
          />

          <OptionUploadImageButton
            isImageVisible={imageUrl.length > 0}
            optionId={optionId}
            onChange={handleUploadImage}
            contentInputRefList={contentInputRefList}
            index={index}
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
