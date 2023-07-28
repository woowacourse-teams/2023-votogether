import CommentModal from '../CommentModal';

import * as S from './style';

interface CommentDeleteModalProps {
  handleCancelClick: () => void;
  handleDeleteClick: () => void;
}

export default function CommentDeleteModal({
  handleCancelClick,
  handleDeleteClick,
}: CommentDeleteModalProps) {
  return (
    <CommentModal
      title="댓글 삭제하기"
      secondaryText="취소"
      primaryText="삭제"
      secondaryClick={handleCancelClick}
      primaryClick={handleDeleteClick}
    >
      <S.Description>{`댓글을 삭제하시겠습니까?\n댓글이 삭제되고 취소할 수 없습니다.`}</S.Description>
    </CommentModal>
  );
}
