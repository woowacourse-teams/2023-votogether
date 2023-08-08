import TwoButtonModal from '../../common/TwoButtonModal';

import * as S from './style';

interface CommentDeleteModalProps {
  handleCancelClick: () => void;
  handleDeleteClick: () => void;
}

export default function CommentDeleteModal({
  handleCancelClick,
  handleDeleteClick,
}: CommentDeleteModalProps) {
  const handlePrimaryButtonClick = () => {
    handleDeleteClick();
    handleCancelClick();
  };

  return (
    <TwoButtonModal
      title="댓글 삭제하기"
      primaryButton={{
        text: '삭제',
        handleClick: handlePrimaryButtonClick,
      }}
      secondaryButton={{
        text: '취소',
        handleClick: handleCancelClick,
      }}
    >
      <S.Description>{`댓글을 삭제하시겠습니까?\n댓글이 삭제되고 취소할 수 없습니다.`}</S.Description>
    </TwoButtonModal>
  );
}
