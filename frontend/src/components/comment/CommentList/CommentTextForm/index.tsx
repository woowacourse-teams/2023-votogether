import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { Comment } from '@type/comment';

import { useCreateComment } from '@hooks/query/comment/useCreateComment';
import { useEditComment } from '@hooks/query/comment/useEditComment';
import { useText } from '@hooks/useText';

import SquareButton from '@components/common/SquareButton';

import { COMMENT_MAX_LENGTH } from '@constants/comment';

import * as S from './style';
interface CommentTextFormProps {
  commentId: number;
  initialComment: Comment;
  handleCancelClick?: () => void;
}

export default function CommentTextForm({
  commentId,
  initialComment,
  handleCancelClick,
}: CommentTextFormProps) {
  const { handleTextChange, text: content, resetText } = useText(initialComment.content);

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const { mutate: createComment } = useCreateComment(postId);
  const { mutate: editComment } = useEditComment(postId, commentId, { ...initialComment, content });

  const updateComment =
    initialComment.id !== -1
      ? () => {
          editComment();
          handleCancelClick && handleCancelClick();
        }
      : () => {
          resetText();
          createComment({ content });
          handleCancelClick && handleCancelClick();
        };

  return (
    <S.Container>
      <S.TextArea
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e, COMMENT_MAX_LENGTH)}
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
          <SquareButton onClick={() => updateComment()} theme="blank" type="button">
            저장
          </SquareButton>
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}
