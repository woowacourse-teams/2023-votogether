import React from 'react';

import { useText } from '@hooks/useText';

import { COMMENT_MAX_LENGTH } from '@constants/comment';

import * as S from './style';

interface CommentEditFormProps {
  initialComment: string;
}

export default function CommentEditForm({ initialComment }: CommentEditFormProps) {
  const { handleTextChange, text } = useText(initialComment);

  return (
    <S.Container>
      <S.TextArea
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleTextChange(e, COMMENT_MAX_LENGTH)
        }
      />
    </S.Container>
  );
}
