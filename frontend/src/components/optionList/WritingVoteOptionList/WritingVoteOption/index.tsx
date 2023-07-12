import OptionCancelButton from './OptionCancelButton';
import OptionUploadImageButton from './OptionUploadImageButton';
import * as S from './style';

interface WritingVoteOptionProps {
  text: string;
  isDeletable: boolean;
  handleDeleteOptionClick: () => void;
  imageUrl?: string;
}

export default function WritingVoteOption({
  text,
  isDeletable,
  handleDeleteOptionClick,
  imageUrl,
}: WritingVoteOptionProps) {
  return (
    <S.Container>
      {isDeletable && (
        <div title="선택지 삭제하기" onClick={handleDeleteOptionClick}>
          <OptionCancelButton />
        </div>
      )}
      <S.OptionContainer>
        <S.ContentContainer>
          <S.ContentTextArea
            value={text}
            placeholder="내용을 입력해주세요."
            rows={2}
            maxLength={50}
          />
          {!imageUrl && <OptionUploadImageButton />}
        </S.ContentContainer>
        {imageUrl && (
          <S.ImageContainer>
            <S.Image src={imageUrl} alt={text} />
            <S.ImageCancelWrapper>
              <OptionCancelButton />
            </S.ImageCancelWrapper>
          </S.ImageContainer>
        )}
      </S.OptionContainer>
    </S.Container>
  );
}
