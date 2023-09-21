import TwoButtonModal from '../../common/TwoButtonModal';

import * as S from './style';

export type TargetForDelete = 'MEMBERSHIP' | 'POST' | 'COMMENT';

const TARGET_FOR_DELETE: Record<TargetForDelete, string> = {
  MEMBERSHIP: '계정을',
  POST: '게시글을',
  COMMENT: '댓글을',
};

interface DeleteModalProps {
  target: TargetForDelete;
  handleCancelClick: () => void;
  handleDeleteClick: () => void;
  isDeleting: boolean;
}

export default function DeleteModal({
  target,
  handleCancelClick,
  handleDeleteClick,
  isDeleting,
}: DeleteModalProps) {
  const handlePrimaryButtonClick = () => {
    !isDeleting && handleDeleteClick();
    handleCancelClick();
  };

  return (
    <TwoButtonModal
      title={`${TARGET_FOR_DELETE[target]} 삭제하기`}
      primaryButton={{
        text: '삭제',
        handleClick: handlePrimaryButtonClick,
      }}
      secondaryButton={{
        text: '취소',
        handleClick: handleCancelClick,
      }}
    >
      <S.Description
        tabIndex={0}
      >{`${TARGET_FOR_DELETE[target]} 삭제하시겠습니까?\n${TARGET_FOR_DELETE[target]} 삭제하면 취소할 수 없습니다.`}</S.Description>
    </TwoButtonModal>
  );
}
