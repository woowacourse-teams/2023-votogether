import { ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Comment } from '@type/comment';

import { useCreateComment } from '@hooks/query/comment/useCreateComment';
import { useEditComment } from '@hooks/query/comment/useEditComment';
import { useText } from '@hooks/useText';
import { useToast } from '@hooks/useToast';

import SquareButton from '@components/common/SquareButton';
import Toast from '@components/common/Toast';

import { COMMENT } from '@constants/comment';

import { deleteOverlappingNewLine } from '@utils/post/deleteOverlappingNewLine';

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
  const {
    text: content,
    handleTextChange,
    resetText,
    addText: addContent,
  } = useText(initialComment.content);
  const { isToastOpen, openToast, toastMessage } = useToast();

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const isEdit = initialComment.id !== -1;

  const {
    mutate: createComment,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = useCreateComment(postId);
  const {
    mutate: editComment,
    isSuccess: isEditSuccess,
    isError: isEditError,
    error: editError,
  } = useEditComment(postId, commentId);

  const updateComment = isEdit
    ? () => {
        editComment({ ...initialComment, content: deleteOverlappingNewLine(content) });
      }
    : () => {
        createComment({ content: deleteOverlappingNewLine(content) });
      };

  useEffect(() => {
    isCreateSuccess && resetText();
  }, [isCreateSuccess]);

  useEffect(() => {
    isEditSuccess && handleCancelClick && handleCancelClick();
  }, [isEditSuccess]);

  useEffect(() => {
    isCreateError && createError instanceof Error && openToast(createError.message);
  }, [isCreateError, createError]);

  useEffect(() => {
    isEditError && editError instanceof Error && openToast(editError.message);
  }, [isEditError, editError]);

  return (
    <S.Container>
      <S.TextArea
        aria-label={isEdit ? '댓글 수정' : '댓글 작성'}
        value={content}
        placeholder="댓글을 입력해주세요. &#13;&#10;타인의 권리를 침해하거나 도배성/광고성/음란성 내용을 포함하는 경우, 댓글의 운영 원칙 및 관련 법률에 의하여 제재를 받을 수 있습니다."
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e, COMMENT)}
      />
      <S.ButtonContainer>
        {isEdit && (
          <S.ButtonWrapper>
            <SquareButton
              aria-label="댓글 취소"
              onClick={handleCancelClick}
              theme="gray"
              type="button"
            >
              취소
            </SquareButton>
          </S.ButtonWrapper>
        )}
        <S.ButtonWrapper>
          <SquareButton
            aria-label="댓글에 링크 넣기"
            onClick={() => addContent('[[괄호 안에 링크 작성]] ')}
            theme="blank"
            type="button"
          >
            링크 넣기
          </SquareButton>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <SquareButton
            aria-label="댓글 저장"
            onClick={() => updateComment()}
            theme="blank"
            type="button"
          >
            저장
          </SquareButton>
        </S.ButtonWrapper>
      </S.ButtonContainer>
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </S.Container>
  );
}
