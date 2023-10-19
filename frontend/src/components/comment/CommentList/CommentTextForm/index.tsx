import { ChangeEvent, KeyboardEvent, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Comment } from '@type/comment';

import { useText } from '@hooks';
import { useCreateComment, useEditComment } from '@hooks';

import { ToastContext } from '@hooks/context/toast';

import SquareButton from '@components/common/SquareButton';

import { POST_COMMENT } from '@constants/policy';

import { deleteOverlappingNewLine } from '@utils/deleteOverlappingNewLine';

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
  const { addMessage } = useContext(ToastContext);
  const { text: content, handleTextChange, resetText } = useText(initialComment.content);

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const isEdit = initialComment.id !== -1;

  const {
    mutate: createComment,
    isSuccess: isCreateSuccess,
    isLoading: createLoading,
  } = useCreateComment(postId);
  const {
    mutate: editComment,
    isSuccess: isEditSuccess,
    isLoading: editLoading,
  } = useEditComment(postId, commentId);

  const handleUpdateComment = () => {
    if (content.trim() === '') {
      addMessage('댓글에 내용을 입력해주세요.');
      return;
    }
    if (isEdit) {
      editComment({ ...initialComment, content: deleteOverlappingNewLine(content) });
      return;
    }
    createComment({ content: deleteOverlappingNewLine(content) });
  };

  const handleKeyboardCommentSubmit = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const isPressCtrlAndEnterKey = (event.metaKey || event.ctrlKey) && event.key === 'Enter';

    if (isPressCtrlAndEnterKey) {
      handleUpdateComment();
    }
  };

  useEffect(() => {
    isCreateSuccess && resetText();
  }, [isCreateSuccess]);

  useEffect(() => {
    isEditSuccess && handleCancelClick && handleCancelClick();
  }, [isEditSuccess]);

  return (
    <S.Container>
      <S.TextArea
        aria-label={isEdit ? '댓글 수정' : '댓글 작성'}
        value={content}
        placeholder="댓글을 입력해주세요. &#13;&#10;타인의 권리를 침해하거나 도배성/광고성/음란성 내용을 포함하는 경우, 댓글의 운영 원칙 및 관련 법률에 의하여 제재를 받을 수 있습니다."
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e, POST_COMMENT)}
        onKeyDown={handleKeyboardCommentSubmit}
      />
      <S.KeyDescription>Ctrl(Command) + Enter 키로 댓글을 저장할 수 있습니다</S.KeyDescription>
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
            aria-label="댓글 저장"
            onClick={handleUpdateComment}
            theme={createLoading || editLoading ? 'gray' : 'fill'}
            type="button"
            disabled={isEdit ? editLoading : createLoading}
          >
            저장
          </SquareButton>
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}
