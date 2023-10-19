import { useToggle } from '@hooks';

import Modal from '../Modal';

import * as S from './style';

export type TargetForDelete = 'MEMBERSHIP' | 'POST' | 'COMMENT';

const TARGET_FOR_DELETE: Record<TargetForDelete, string> = {
  MEMBERSHIP: '계정',
  POST: '게시글',
  COMMENT: '댓글',
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
  const { isOpen: isModalOpen, closeComponent: closeModal } = useToggle(true);

  const handlePrimaryButtonClick = () => {
    !isDeleting && handleDeleteClick();
    handleCancelClick();
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          handleModalClose={closeModal}
          title={`${TARGET_FOR_DELETE[target]} 삭제`}
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
          >{`${TARGET_FOR_DELETE[target]}을 삭제하시겠습니까?\n삭제 버튼 클릭 시 취소할 수 없습니다.`}</S.Description>
        </Modal>
      )}
    </>
  );
}
