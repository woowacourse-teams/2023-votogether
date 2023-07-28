import React from 'react';

import { useText } from '@hooks/useText';

import SquareButton from '@components/common/SquareButton';

import { COMMENT_MAX_LENGTH } from '@constants/comment';

import * as S from './style';

interface CommentTextFormProps {
  initialComment: string;
  handleCancelClick?: () => void;
}

export default function CommentTextForm({
  initialComment,
  handleCancelClick,
}: CommentTextFormProps) {
  const { handleTextChange, text } = useText(initialComment);

  return (
    <S.Container>
      <S.TextArea
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleTextChange(e, COMMENT_MAX_LENGTH)
        }
      />
      <S.ButtonContainer>
        {handleCancelClick && (
          <S.ButtonWrapper>
            <SquareButton onClick={handleCancelClick} theme="gray" type="button">
              취소
            </SquareButton>
          </S.ButtonWrapper>
        )}
        <S.ButtonWrapper>
          <SquareButton theme="blank" type="button">
            저장
          </SquareButton>
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}
